import { contentCommonPartNames, ContentType } from "../common-schemas";
import {
	IMultipleChoiceContent,
	IMultipleChoiceUserAns,
	IRMultipleChoiceContent,
	MCContentDesignStructure,
} from "./types";
import { QuestionContent } from "../class";

class MultipleChoice
	extends QuestionContent<IMultipleChoiceUserAns, IMultipleChoiceUserAns>
	implements IMultipleChoiceContent {
	static getEmptyContent(
		designStructure?: MCContentDesignStructure
	): IMultipleChoiceContent {
		if (designStructure === MCContentDesignStructure.twoColumns) {
			return {
				type: ContentType.MultipleChoice,
				statement: {
					id: 1,
					text: "",
					textA: "",
					textB: "",
				},
				choices: [
					{
						id: 2,
						text:
							"A სვეტის უჯრაში მოცემული რაოდენობა მეტია B სვეტის უჯრაში მოცემულ რაოდენობაზე.",
					},
					{
						id: 3,
						text:
							"B სვეტის უჯრაში მოცემული რაოდენობა მეტია A სვეტის უჯრაში მოცემულ რაოდენობაზე.",
					},
					{
						id: 4,
						text:
							"A სვეტის უჯრაში მოცემული რაოდენობა B სვეტის უჯრაში მოცემული რაოდენობის ტოლია.",
					},
					{
						id: 5,
						text:
							"მოცემული ინფორმაცია საკმარისი არაა იმის დასადგენად, რომელი რაოდენობაა მეტი.",
					},
				],
				designStructure: MCContentDesignStructure.twoColumns,
			};
		}
		if (designStructure === MCContentDesignStructure.dataSufficiency) {
			return {
				type: ContentType.MultipleChoice,
				statement: {
					id: 1,
					text: "<br/>მოცემულია ორი პირობა:<br/>I. <br/>II. <br/>",
				},
				choices: [
					{
						id: 2,
						text: "I პირობა საკმარისია, II კი – არა.",
					},
					{
						id: 3,
						text: "II პირობა საკმარისია, I კი – არა.",
					},
					{
						id: 4,
						text:
							"I და II პირობა ერთად საკმარისია, ცალ-ცალკე არც ერთი არ არის საკმარისი.",
					},
					{
						id: 5,
						text:
							"საკმარისია ცალ-ცალკე როგორც I, ასევე, II პირობა.",
					},
					{
						id: 6,
						text: "მოცემული პირობები არ არის საკმარისი.",
					},
				],
				designStructure: MCContentDesignStructure.dataSufficiency,
			};
		}
		return {
			type: ContentType.MultipleChoice,
			statement: {
				id: 1,
				text: "",
			},
			choices: new Array(4).fill(0).map((e, i) => ({
				id: i + 1,
				text: "",
			})),
		};
	}

	type: IMultipleChoiceContent["type"];

	statement: IMultipleChoiceContent["statement"];
	choices: IMultipleChoiceContent["choices"];
	canSelectMultiple: IMultipleChoiceContent["canSelectMultiple"];
	disableShuffle?: IMultipleChoiceContent["disableShuffle"];
	designStructure?: IMultipleChoiceContent["designStructure"];

	constructor(content: IMultipleChoiceContent) {
		super();
		if (content.type !== ContentType.MultipleChoice) {
			throw new Error("not multiple choice");
		}
		const keys = [
			...contentCommonPartNames,
			"statement",
			"choices",
			"canSelectMultiple",
			"canSelectMultiple",
			"disableShuffle",
			"disableShuffle",
			"designStructure",
		];
		keys.forEach(fieldName => {
			if (content[fieldName] !== undefined) {
				this[fieldName] = content[fieldName];
			}
		});
	}
	
	getUsedIds(): number[] {
		const ids: number[] = [];
		ids.push(this.statement.id);
		this.choices.forEach(e => ids.push(e.id));
		if (this.explanation) ids.push(this.explanation.id);
		return ids;
	};

	getStripped() {
		const stripped: IRMultipleChoiceContent = {
			type: this.type,
			statement: this.statement,
			choices: this.choices.map(e => {
				const { score, ...rest } = e;
				return rest;
			}),
			canSelectMultiple: this.canSelectMultiple,
			disableShuffle: this.disableShuffle,
		};
		return stripped;
	}

	getAnswer() {
		return MultipleChoice.getAnswer(this);
	}

	static getAnswer({
		choices,
		canSelectMultiple,
	}: Pick<IMultipleChoiceContent, "choices" | "canSelectMultiple">) {
		if (canSelectMultiple) {
			return choices
				.filter(c => typeof c.score === "number" && c.score > 0)
				.map(c => c.id);
		}
		const choice = choices.find(
			c => typeof c.score === "number" && c.score > 0
		);
		if (!choice) {
			return null;
		}
		return choice.id;
	}

	static isCorrectChoice({
		choiceId,
		correctAnswer,
	}: {
		choiceId: number;
		correctAnswer: number | number[];
	}): boolean {
		if (!Array.isArray(correctAnswer)) return correctAnswer === choiceId;
		return correctAnswer.indexOf(choiceId) > -1;
	}

	static isFullyCorrectlyAnswered({
		userAnswer,
		correctAnswer,
	}: {
		userAnswer: any;
		correctAnswer: number | number[];
	}): boolean {
		if (!Array.isArray(correctAnswer)) return correctAnswer === userAnswer;
		if (
			correctAnswer.length === 0 &&
			(userAnswer === null ||
				userAnswer === undefined ||
				userAnswer.length === 0)
		) {
			return true;
		}
		if (!Array.isArray(userAnswer)) return false;
		return correctAnswer.sort().join(",") === userAnswer.sort().join(",");
	}

	getCorrectAnswerAsUserAnswer() {
		return this.getAnswer();
	}

	isAnsweredCorrectly(userAnswer: number | number[]) {
		const creditShare = this.getCreditShare(userAnswer);
		if (creditShare >= 1 - 1e-6) return true;
		const maxCredit = this.getMaxCredit();
		const myCredit = creditShare * maxCredit;
		if (this.allowPartialCredit) {
			if (this.minScoreForCredit === undefined) return myCredit > 0;
			return myCredit >= this.minScoreForCredit! - 1e-6;
		}
		return false;
	}

	getCreditShare(userAnswer: number | number[]): number {
		const answer = this.getAnswer();

		if (!this.canSelectMultiple) {
			return userAnswer === answer ? 1 : 0;
		}
		if (!Array.isArray(answer) || !Array.isArray(userAnswer)) {
			throw new Error(
				"when canSelectMultiple is set to true, answers must be multiple"
			);
		}

		let numCorrect = 0;

		for (let i = 0; i < userAnswer.length; i++) {
			if (answer.indexOf(userAnswer[i]) !== -1) {
				numCorrect++;
			}
		}

		return userAnswer.length !== 0 ? numCorrect / userAnswer.length : 0;
	}

	getMaxCredit() {
		if (!this.canSelectMultiple) {
			return this.choices.reduce(
				(max, current) => Math.max(max, current.score || 0),
				0
			) as number;
		}
		return this.choices.reduce(
			(max, current) => max + (current.score || 0),
			0
		) as number;
	}

	getShortStat(separator = this.defaultSeparator) {
		if (this.designStructure === MCContentDesignStructure.twoColumns) {
			return [
				this.statement.text,
				this.statement.textA,
				this.statement.textB,
			]
				.filter(e => !!e)
				.join(separator);
		}
		return this.statement.text;
	}

	serialize(separator = this.defaultSeparator) {
		const statement = this.getShortStat(separator);
		const choices = this.choices.map(e => e.text).join(separator);
		return statement + separator + choices;
	}

	hasAnsweredFully(userAnswer?: IMultipleChoiceUserAns) {
		if (userAnswer === null || userAnswer === undefined) return false;
		return true;
	}
}

export default MultipleChoice;
