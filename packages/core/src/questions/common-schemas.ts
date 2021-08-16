import { StrictFillingBlanksEmptyContentSettings } from "./filling-blanks/types";
import { StrictGroupingItemsEmptyContentSettings } from "./grouping-items/types";
import { StrictMultipleChoiceEmptyContentSettings } from "./multiple-choice/types";
import { StrictMultipleContentsEmptyContentSettings } from "./multiple-contents/types";
import { StrictSortItemsEmptyContentSettings } from "./sort-items/types";

export enum ContentType {
	MultipleChoice = 1,
	TwoColumns = 2,
	SortItems = 3,
	CorrectionOfText = 4,
	GroupingItems = 5,
	FillingBlanks = 6,
	MultipleContents = 7,
	Text = 8,
}
export const ContentTypesFields: ContentType[] = [
	ContentType.MultipleChoice,
	ContentType.TwoColumns,
	ContentType.SortItems,
	ContentType.CorrectionOfText,
	ContentType.GroupingItems,
	ContentType.FillingBlanks,
	ContentType.MultipleContents,
];

///

export interface IStatement {
	id: number;
	text: string;
}

///

export interface ITextStatement extends IStatement {
	type: ContentType.Text;
}

///

export interface ICommonQuestionParts {
	type: ContentType;
	explanation?: IStatement;
	allowPartialCredit?: boolean;
	minScoreForCredit?: number | null;
}

///

export const contentCommonPartNames: (keyof ICommonQuestionParts)[] = [
	"type",
	"explanation",
	"allowPartialCredit",
	"minScoreForCredit",
];

export type forbiddenProperty = "explanation" | "minScoreForCredit";
export const forbiddenProperties: forbiddenProperty[] = [
	"explanation",
	"minScoreForCredit",
];

export type StatTransformerFn = <T extends IStatement | undefined>(data: T) => any;

export interface EmptyContentCreationSettings {
	contentType: ContentType;
	designStructure?: string | null;
	[key: string]: any;
}

export interface StrictEmptyContentCreationSettings {
	[ContentType.FillingBlanks]: StrictFillingBlanksEmptyContentSettings;
	[ContentType.GroupingItems]: StrictGroupingItemsEmptyContentSettings;
	[ContentType.MultipleChoice]: StrictMultipleChoiceEmptyContentSettings;
	[ContentType.MultipleContents]: StrictMultipleContentsEmptyContentSettings;
	[ContentType.SortItems]: StrictSortItemsEmptyContentSettings;
}
