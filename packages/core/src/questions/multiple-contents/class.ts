import {
	contentCommonPartNames,
	ContentType,
	ITextStatement,
} from "../common-schemas";
import {
	IMultipleContents,
	IMultipleContentsUserAns,
	IRMultipleContents,
} from "./types";
import { newContent } from "../new-content";
import { QuestionContent } from "../class";
import { IQuestionContent } from "../schemas";

type IItem = Omit<IMultipleContents["items"][number], "content"> & {
	content: IQuestionContent | ITextStatement;
};

class MultipleContents
	extends QuestionContent<IMultipleContentsUserAns, IMultipleContentsUserAns>
	implements IMultipleContents {
	static getEmptyContent(): IMultipleContents {
		return {
			type: ContentType.MultipleContents,
			items: [],
		};
	}

	type: IMultipleContents["type"];
	items: IItem[];

	constructor(content: IMultipleContents) {
		super();
		if (content.type !== ContentType.MultipleContents) {
			throw new Error("not multiple content items");
		}
		const keys = [...contentCommonPartNames, "minAnsForCredit"];
		keys.forEach(fieldName => {
			if (content[fieldName as any] !== undefined) {
				this[fieldName] = content[fieldName as any];
			}
		});
		if (content.items !== undefined) {
			this.items = content.items.map(item => {
				if (item.content.type === ContentType.Text) {
					return item as IItem;
				}
				return { ...item, content: newContent(item.content) };
			});
		}
	}

	getStripped() {
		const stripped: IRMultipleContents = {
			type: this.type,
			allowPartialCredit: this.allowPartialCredit,
			minScoreForCredit: this.minScoreForCredit,
			items: this.items.map(item => {
				if (item.content.type === ContentType.Text) {
					return item;
				}
				const content = newContent(item.content).getStripped();
				return { ...item, content };
			}),
		};
		return stripped;
	}

	getAnswer() {
		const ans: IMultipleContentsUserAns = {};
		for (let i = 0; i < this.items.length; ++i) {
			const item = this.items[i];
			if (item.content.type === ContentType.Text) continue;
			(ans[item.id] as any) = item.content.getAnswer();
		}
		return ans;
	}

	getCorrectAnswerAsUserAnswer() {
		const ans: IMultipleContentsUserAns = {};
		for (let i = 0; i < this.items.length; ++i) {
			const item = this.items[i];
			if (item.content.type === ContentType.Text) continue;
			(ans[item.id] as any) = item.content.getCorrectAnswerAsUserAnswer();
		}
		return ans;
	}

	getCreditShare(userAnswer: IMultipleContentsUserAns): number {
		let userCredit = 0;
		let totalCredit = 0;

		this.items.forEach((item, i) => {
			if (item.content.type !== ContentType.Text) {
				const maxCredit = item.content.getMaxCredit();
				userCredit +=
					item.content.getCreditShare(
						userAnswer ? userAnswer[item.id] || null : null
					) * maxCredit;
				totalCredit += maxCredit;
			}
		});

		return totalCredit !== 0 ? userCredit / totalCredit : 0;
	}

	getMaxCredit(): number {
		return this.items.reduce((total, item) => {
			return (
				total +
				(item.content.type !== ContentType.Text
					? item.content.getMaxCredit()
					: 0)
			);
		}, 0);
	}

	getShortStat(separator = this.defaultSeparator) {
		if (this.items.length === 0) return " ";
		const item = this.items[0];
		if (item.content.type === ContentType.Text) {
			return item.content.text;
		}
		return newContent(item.content).getShortStat(separator);
	}

	serialize(separator = this.defaultSeparator) {
		if (this.items.length === 0) return " ";
		return this.items
			.map(item => {
				if (item.content.type === ContentType.Text) {
					return item.content.text;
				}
				return newContent(item.content).serialize(separator);
			})
			.join(separator);
	}

	getNumOfPages(): number {
		let numOfPages = 0;
		for (let i = 0; i < this.items.length; ++i) {
			if (
				!this.items[i].settings ||
				!this.items[i].settings!.nextContentOnSamePage
			) {
				numOfPages++;
			}
		}
		return numOfPages;
	}

	hasAnsweredFully(userAnswer?: IMultipleContentsUserAns): boolean {
		const numOfPages = this.getNumOfPages();
		for (let i = 0; i < numOfPages; i++) {
			if (!this.hasDonePage(i, userAnswer)) return false;
		}
		return true;
	}

	hasDonePage = (
		pageIndex: number,
		userAnswer?: IMultipleContentsUserAns
	) => {
		const items = this.getPageItems(pageIndex);
		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			if (item.content.type === ContentType.Text) continue;
			if (!userAnswer) return false;
			const childContent = newContent(item.content as any);
			if (!childContent.hasAnsweredFully(userAnswer[item.id] as any)) {
				return false;
			}
		}
		return true;
	};

	getPageItems = (pageIndex: number) => {
		let curPageIndex = 0;
		const selectedItems: (
			| IRMultipleContents["items"][number]
			| IMultipleContents["items"][number]
		)[] = [];
		for (let i = 0; i < this.items.length; ++i) {
			if (curPageIndex === pageIndex) selectedItems.push(this.items[i]);
			if (
				!this.items[i].settings ||
				!this.items[i].settings!.nextContentOnSamePage
			) {
				curPageIndex++;
				if (curPageIndex > pageIndex) break;
			}
		}
		return selectedItems;
	};
}

export default MultipleContents;
