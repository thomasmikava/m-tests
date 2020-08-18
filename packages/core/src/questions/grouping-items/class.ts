import { contentCommonPartNames, ContentType } from "../common-schemas";
import {
	IGroupingItemsContent,
	IGroupingItemsUserAns,
	IRGroupingItemsContent,
	RelationType,
} from "./types";
import { QuestionContent } from "../class";

class GroupingItems
	extends QuestionContent<
		IGroupingItemsContent["itemsToGroups"],
		IGroupingItemsUserAns
	>
	implements IGroupingItemsContent {
	static getEmptyContent(): IGroupingItemsContent {
		return {
			type: ContentType.GroupingItems,
			statement: {
				id: 1,
				text: "",
			},
			groups: [],
			items: [],
			itemsToGroups: [],
			relationType: RelationType.OneToOne,
		};
	}
	type: IGroupingItemsContent["type"];

	items: IGroupingItemsContent["items"];
	itemsToGroups: IGroupingItemsContent["itemsToGroups"];
	groups: IGroupingItemsContent["groups"];
	relationType: IGroupingItemsContent["relationType"];

	constructor(content: IGroupingItemsContent) {
		super();
		if (content.type !== ContentType.GroupingItems) {
			throw new Error("not grouping items");
		}
		const keys = [
			...contentCommonPartNames,
			"items",
			"itemsToGroups",
			"groups",
			"relationType",
		];
		keys.forEach(fieldName => {
			if (content[fieldName] !== undefined) {
				this[fieldName] = content[fieldName];
			}
		});
	}

	getStripped() {
		const stripped: IRGroupingItemsContent = {
			type: this.type,
			allowPartialCredit: this.allowPartialCredit,
			minScoreForCredit: this.minScoreForCredit,
			items: this.items,
			groups: this.groups,
			relationType: this.relationType,
		};
		return stripped;
	}

	getAnswer() {
		return this.itemsToGroups;
	}

	getCorrectAnswerAsUserAnswer() {
		return this.getAnswer();
	}

	getCreditShare(userAnswer: any) {
		let numCorrect = 0;
		const numTotal = this.itemsToGroups.length;
		if (numTotal === 0) {
			return 0;
		}

		for (let i = 0; i < userAnswer.length; i++) {
			const userPair = userAnswer[i];
			const isCorrect =
				this.itemsToGroups.findIndex(item => {
					return (
						item.itemId === userPair.itemId &&
						item.groupId === userPair.groupId
					);
				}) !== -1;
			if (isCorrect) {
				numCorrect++;
			}
		}

		return numCorrect / numTotal;
	}

	getMaxCredit() {
		return this.itemsToGroups.length;
	}

	getShortStat(separator = this.defaultSeparator) {
		return " "; // FIXME:
	}

	serialize(separator = this.defaultSeparator) {
		return " "; // FIXME:
	}

	hasAnsweredFully(userAnswer?: IGroupingItemsUserAns): boolean {
		// FIXME: enhance logic
		if (userAnswer === null || userAnswer === undefined) return false;
		return true;
	}
}

export default GroupingItems;
