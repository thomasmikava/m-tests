import Levenshtein from "levenshtein";
import {
	CheckStrictness,
	getCoefficient,
	IFillingBlanksContent,
	IFillingBlanksUserAns,
	IRFillingBlanksContent,
	FBItemType,
	FBContentDesignStructure,
	CheckerType,
	FBInputSize,
} from "./types";
import {
	contentCommonPartNames,
	ContentType,
	EmptyContentCreationSettings,
	IStatement,
	StatTransformerFn,
} from "../common-schemas";
import { QuestionContent } from "../class";
import { pickKeys } from "../../utils/objects";

export interface IAnswer {
	[id: number]: {
		correctInputs: IStatement[];
		score: number;
		checkStrictness: CheckStrictness;
	};
}

export interface IUserAnswerCorrectness {
	/** itemId -> score */
	[id: number]: {
		userScore: number;
		totalScore: number;
	};
}

class FillingBlanks extends QuestionContent<IAnswer, IFillingBlanksUserAns>
	implements IFillingBlanksContent {
	designStructure?: IFillingBlanksContent["designStructure"];

	public static getEmptyContent(
		settings: EmptyContentCreationSettings
	): IFillingBlanksContent {
		const { designStructure } = settings;
		if (designStructure === FBContentDesignStructure.essay) {
			return {
				type: ContentType.FillingBlanks,
				items: [
					{
						id: 1,
						type: FBItemType.Text,
						text: "",
					},
					{
						id: 2,
						type: FBItemType.NonCheckableInput,
						whoWillCheck: CheckerType.Editor,
						size: FBInputSize.ExtraLarge,
					},
				],
				designStructure: FBContentDesignStructure.essay,
			};
		}
		if (designStructure === FBContentDesignStructure.essayWithFiles) {
			return {
				type: ContentType.FillingBlanks,
				items: [
					{
						id: 1,
						type: FBItemType.Text,
						text: "",
						files: [],
					},
					{
						id: 2,
						type: FBItemType.NonCheckableInput,
						whoWillCheck: CheckerType.Editor,
						size: FBInputSize.Large,
						uploadFiles: true,
					},
				],
				designStructure: FBContentDesignStructure.essayWithFiles,
			};
		}
		return {
			type: ContentType.FillingBlanks,
			items: [
				{
					id: 1,
					type: FBItemType.Text,
					text: "",
				},
			],
		};
	}

	private static getBestLevenshteinCoefficient(
		userAnswer: IStatement,
		correctInputs: IStatement[]
	): number {
		let bestCoefficient = Infinity; // the lower the better
		correctInputs.forEach(correctInput => {
			const original = correctInput.text.trim();
			const u = userAnswer.text.trim();
			const levenshtein = new Levenshtein(original, u);
			const coefficient = levenshtein.distance / original.length;

			if (coefficient < bestCoefficient) {
				bestCoefficient = coefficient;
			}
		});

		return bestCoefficient;
	}

	type: IFillingBlanksContent["type"];

	items: IFillingBlanksContent["items"];
	ignoreOrderOfInputs: IFillingBlanksContent["ignoreOrderOfInputs"];

	static keys: (keyof IFillingBlanksContent)[] = [
		...contentCommonPartNames,
		"items",
		"ignoreOrderOfInputs",
		"designStructure",
	];

	constructor(content: IFillingBlanksContent) {
		super();
		if (content.type !== ContentType.FillingBlanks) {
			throw new Error("not filling blanks");
		}
		FillingBlanks.keys.forEach(fieldName => {
			if (content[fieldName] !== undefined) {
				this[fieldName as any] = content[fieldName];
			}
		});
	}

	getMappedStatsContent(
		transformer: StatTransformerFn
	): IFillingBlanksContent {
		return {
			...pickKeys(this, ...FillingBlanks.keys),
			items: this.items.map(item => {
				if (item.type === FBItemType.Input) {
					return {
						...item,
						correctInputs: item.correctInputs.map(inp =>
							transformer(inp)
						),
					};
				}
				if (item.type === FBItemType.Text) {
					return transformer(item);
				}
				return item;
			}),
			explanation: transformer(this.explanation),
		};
	}

	getUsedIds(): number[] {
		const ids: number[] = [];
		this.items.forEach(item => {
			ids.push(item.id);
			if (item.type === FBItemType.Input) {
				item.correctInputs.forEach(inp => ids.push(inp.id));
			}
		});
		if (this.explanation) ids.push(this.explanation.id);
		return ids;
	}

	getStripped() {
		const itemsToPut: IRFillingBlanksContent["items"] = [];

		for (let i = 0; i < this.items.length; i++) {
			const item = { ...this.items[i] };
			delete (item as any).correctInputs;
			itemsToPut.push(item);
		}

		const stripped: IRFillingBlanksContent = {
			type: this.type,
			items: itemsToPut,
			ignoreOrderOfInputs: this.ignoreOrderOfInputs,
			allowPartialCredit: this.allowPartialCredit,
			minScoreForCredit: this.minScoreForCredit,
		};
		return stripped;
	}

	getAnswer() {
		const result: IAnswer = {};

		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.type === FBItemType.Input) {
				result[item.id] = result[item.id] || {};

				result[item.id].correctInputs = item.correctInputs;
				result[item.id].score = item.score;
				result[item.id].checkStrictness = item.checkStrictness;
			}
		}
		return result;
	}

	getCorrectAnswerAsUserAnswer() {
		const result: IFillingBlanksUserAns = {};

		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.type === FBItemType.Input) {
				result[item.id] = {
					id: item.id,
					text: item.correctInputs[0]!.text,
				};
			}
		}
		return result;
	}

	getCreditShare(userAnswer: IFillingBlanksUserAns): number {
		const eachAnswerCorrectness = this.getEachAnswerCorrectness(userAnswer);
		const itemIds = Object.keys(eachAnswerCorrectness).map(Number);

		let userTotal = 0;
		let total = 0;

		itemIds.forEach(id => {
			const { userScore, totalScore } = eachAnswerCorrectness[id];

			userTotal += userScore;
			total += totalScore;
		});

		return total !== 0 ? userTotal / total : 0;
	}

	getEachAnswerCorrectness(
		userAnswer: IFillingBlanksUserAns | null
	): IUserAnswerCorrectness {
		const correctAnswer = this.getAnswer();
		const itemIds = Object.keys(correctAnswer).map(Number);

		const result: IUserAnswerCorrectness = {};

		// prevent user from entering same words when "ignoreOrderOfInputs" == true
		const alreadyAnswered = new Set<string>();

		for (let i = 0; i < itemIds.length; i++) {
			const currentItemId = itemIds[i];
			const {
				correctInputs,
				checkStrictness,
				score: totalScore,
			} = correctAnswer[currentItemId];

			const currentUserAnswer = userAnswer
				? userAnswer[currentItemId]
				: undefined;
			let userScore = 0;

			if (
				!currentUserAnswer ||
				currentUserAnswer.id === undefined ||
				currentUserAnswer.text === undefined
			) {
				userScore = 0;
			} else {
				if (this.ignoreOrderOfInputs) {
					if (alreadyAnswered.has(currentUserAnswer.text)) {
						userScore = 0;
						result[currentItemId] = { userScore, totalScore };
						continue;
					} else {
						alreadyAnswered.add(currentUserAnswer.text);
					}
				}

				const bestCoefficient = FillingBlanks.getBestLevenshteinCoefficient(
					currentUserAnswer,
					correctInputs
				);

				if (bestCoefficient <= getCoefficient(checkStrictness)) {
					userScore = totalScore;
				} else {
					userScore = 0;
				}
			}

			result[currentItemId] = { userScore, totalScore };
		}

		return result;
	}

	getMaxCredit() {
		const answer = this.getAnswer();
		let total = 0;

		for (const id in answer) {
			if (answer.hasOwnProperty(id)) {
				total += answer[id].score || 0;
			}
		}
		return total;
	}

	getShortStat(separator = this.defaultSeparator) {
		return this.items
			.map(i => (i.type === FBItemType.Text ? i.text : "----"))
			.join(separator);
	}

	serialize(separator = this.defaultSeparator, innserItemsSeparator = ", ") {
		return this.items
			.map(i =>
				i.type === FBItemType.Text
					? i.text
					: i.type === FBItemType.Input
					? i.correctInputs
							.map(e => e.text)
							.join(innserItemsSeparator)
					: "----"
			)
			.join(separator);
	}

	hasAnsweredFully = (userAnswer?: IFillingBlanksUserAns) => {
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.type === FBItemType.Text) continue;
			if (!userAnswer) return false;
			if (
				userAnswer[item.id] === undefined ||
				userAnswer[item.id] === null
			) {
				return false;
			}
		}
		return true;
	};
}

export default FillingBlanks;
