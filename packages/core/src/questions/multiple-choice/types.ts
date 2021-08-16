import {
	ContentType,
	forbiddenProperty,
	ICommonQuestionParts,
	IStatement,
} from "../common-schemas";

export interface IMultipleChoiceContent extends ICommonQuestionParts {
	type: ContentType.MultipleChoice;
	statement: IStatement & Record<any, any>;
	choices: (IStatement & {
		score?: number;
	})[];
	canSelectMultiple?: boolean;
	disableShuffle?: boolean;
	designStructure?: string;
}

export type IRMultipleChoiceContent = Omit<
	IMultipleChoiceContent,
	forbiddenProperty | "choices"
> & {
	choices: IStatement[];
};

export type IMultipleChoiceUserAns = number | number[] | null;

export interface StrictMultipleChoiceEmptyContentSettings {
	canSelectMultiple?: boolean;
	disableShuffle?: boolean;
	numOfChoices?: number;
}
