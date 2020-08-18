import {
	ContentType,
	forbiddenProperty,
	ICommonQuestionParts,
	IStatement,
} from "../common-schemas";

export enum MCContentDesignStructure {
	twoColumns = "2Cols",
	dataSufficiency = "DataSufficiency",
}

export const MCContentDesignStructures = [
	MCContentDesignStructure.twoColumns,
	MCContentDesignStructure.dataSufficiency,
];

export interface IMultipleChoiceContent extends ICommonQuestionParts {
	type: ContentType.MultipleChoice;
	statement: IStatement & Record<any, any>;
	choices: (IStatement & {
		score?: number;
	})[];
	canSelectMultiple?: boolean;
	disableShuffle?: boolean;
	designStructure?: MCContentDesignStructure;
}

export type IRMultipleChoiceContent = Omit<
	IMultipleChoiceContent,
	forbiddenProperty | "choices"
> & {
	choices: IStatement[];
};

export type IMultipleChoiceUserAns = number | number[] | null;
