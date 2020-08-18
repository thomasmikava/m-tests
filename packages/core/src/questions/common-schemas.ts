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
