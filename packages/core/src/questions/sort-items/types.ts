import {
	ContentType,
	forbiddenProperty,
	ICommonQuestionParts,
	IStatement,
} from "../common-schemas";

export interface ISortItemsContent extends ICommonQuestionParts {
	type: ContentType.SortItems;
	statement: IStatement;
	items: IStatement[];
	correctOrder: number[];
}

export type IRSortItemsContent = Omit<
	ISortItemsContent,
	forbiddenProperty | "correctOrder"
>;

export type ISortItemsUserAns = number[] | null;

export interface StrictSortItemsEmptyContentSettings {
}
