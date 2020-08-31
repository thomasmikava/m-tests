import { contentCommonPartNames, ContentType, StatTransformerFn } from "../common-schemas";
import {
	IRSortItemsContent,
	ISortItemsContent,
	ISortItemsUserAns,
} from "./types";
import { QuestionContent } from "../class";
import { pickKeys } from "../../utils/objects";

interface IIndicesByValue {
	[value: number]: number;
}

class SortItems extends QuestionContent<ISortItemsUserAns, ISortItemsUserAns>
	implements ISortItemsContent {
	static getEmptyContent(): ISortItemsContent {
		return {
			type: ContentType.SortItems,
			statement: {
				id: 1,
				text: "",
			},
			items: [
				{
					id: 2,
					text: "",
				},
				{
					id: 3,
					text: "",
				},
				{
					id: 4,
					text: "",
				},
			],
			correctOrder: [2, 3, 4],
		};
	}

	// tslint:disable-next-line:cognitive-complexity
	private static getNumCorrectPairs(
		order: number[],
		correctOrder: number[]
	): number {
		if (correctOrder.length !== order.length) {
			throw new Error("lengths of the 2 arrays must match");
		}

		const indicesByValue: IIndicesByValue = SortItems.getIndicesByValue(
			correctOrder
		);

		let numCorrectPairs = 0;
		let previousValue: number | undefined;
		let isSequence = false;

		for (let i = 0; i < order.length; i++) {
			const currentValue = order[i];
			if (indicesByValue[currentValue] === i) {
				numCorrectPairs++;
				isSequence = false;
				continue;
			}

			if (previousValue !== undefined) {
				const currentValueIndex = indicesByValue[currentValue];
				const previousValueIndex = indicesByValue[previousValue];

				if (currentValueIndex === previousValueIndex + 1) {
					numCorrectPairs += isSequence ? 1 : 2;
					isSequence = true;
				} else {
					isSequence = false;
				}
			}
			// "else didPreviousMatch = false" not needed because
			// previous value === undefined only during 0-th iteration

			previousValue = currentValue;
		}

		return numCorrectPairs;
	}

	private static getIndicesByValue(array: number[]): IIndicesByValue {
		const indicesByValue: IIndicesByValue = {};

		array.forEach((value, index) => {
			indicesByValue[value] = index;
		});

		return indicesByValue;
	}

	type: ISortItemsContent["type"];

	statement: ISortItemsContent["statement"];
	items: ISortItemsContent["items"];
	correctOrder: ISortItemsContent["correctOrder"];
	
	static keys: (keyof ISortItemsContent)[] = [
		...contentCommonPartNames,
		"statement",
		"items",
		"correctOrder",
	];

	constructor(content: ISortItemsContent) {
		super();
		if (content.type !== ContentType.SortItems) {
			throw new Error("not sort items");
		}
		contentCommonPartNames.forEach(fieldName => {
			if (content[fieldName] !== undefined) {
				(this[fieldName] as any) = content[fieldName];
			}
		});
		SortItems.keys.forEach(fieldName => {
			if (content[fieldName] !== undefined) {
				this[fieldName as any] = content[fieldName];
			}
		});
	}
	
	getMappedStatsContent(transformer: StatTransformerFn): ISortItemsContent {
		return {
			...pickKeys(this, ...SortItems.keys),
			statement: transformer(this.statement),
			items: this.items.map(c => transformer(c)),
			explanation: transformer(this.explanation),
		}
	}
	
	getUsedIds(): number[] {
		const ids: number[] = [];
		ids.push(this.statement.id);
		this.items.forEach(e => ids.push(e.id));
		if (this.explanation) ids.push(this.explanation.id);
		return ids;
	};

	getStripped() {
		const stripped: IRSortItemsContent = {
			type: this.type,
			statement: this.statement,
			items: this.items,
		};
		return stripped;
	}

	getAnswer() {
		return this.correctOrder;
	}

	getCorrectAnswerAsUserAnswer() {
		return this.getAnswer();
	}

	getCreditShare(userAnswer: ISortItemsUserAns) {
		if (!userAnswer) return 0;
		const numCorrect = SortItems.getNumCorrectPairs(
			userAnswer,
			this.correctOrder
		);
		return numCorrect / this.correctOrder.length;
	}

	getMaxCredit(): number {
		return 1;
	}

	getShortStat(separator = this.defaultSeparator) {
		return this.statement.text;
	}

	serialize(separator = this.defaultSeparator) {
		const statement = this.getShortStat(separator);
		const items = this.items.map(e => e.text).join(separator);
		return statement + separator + items;
	}

	hasAnsweredFully = (userAnswer?: ISortItemsUserAns) => {
		// TODO: check if every item is in userAnswer
		if (userAnswer === null || userAnswer === undefined) return false;
		return true;
	};
}

export default SortItems;
