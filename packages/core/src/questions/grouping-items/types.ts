import {
	ContentType,
	ICommonQuestionParts,
	IStatement,
} from "../common-schemas";

export enum RelationType {
	OneToOne = 0,
	ManyToOne = 1,
	ManyToMany = 2,
}

export const RelationTypes = [
	RelationType.OneToOne,
	RelationType.ManyToOne,
	RelationType.ManyToMany,
];

export interface IGroupingItemsContent extends ICommonQuestionParts {
	type: ContentType.GroupingItems;
	statement: IStatement;
	groups: IStatement[];
	items: IStatement[];
	itemsToGroups: {
		itemId: number;
		groupId: number;
	}[];
	relationType: RelationType;
}

export type IRGroupingItemsContent = Omit<
	IGroupingItemsContent,
	"explanation" | "itemsToGroups"
>;

///

export type IGroupingItemsUserAns = {
	itemId: number;
	groupId: number;
}[];
