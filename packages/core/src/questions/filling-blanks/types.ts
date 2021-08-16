import {
	ContentType,
	ICommonQuestionParts,
	IStatement,
} from "../common-schemas";

export enum FBContentDesignStructure {
	essay = "essay",
	essayWithFiles = "essayWithFiles",
}

export const FBContentDesignStructures = [
	FBContentDesignStructure.essay,
	FBContentDesignStructure.essayWithFiles,
];

///

export enum FBItemType {
	Text = 0,
	Input = 1,
	NonCheckableInput = 2,
}

export enum CheckerType {
	NoOne = 0,
	OneSelf = 1,
	Editor = 2,
}

export const CheckerTypeFields = [
	CheckerType.NoOne,
	CheckerType.OneSelf,
	CheckerType.Editor,
];

export enum CheckStrictness {
	LOW = 0,
	MEDIUM = 1,
	HIGH = 2,
}

export const StrictnessCoefficients = {
	[CheckStrictness.LOW]: 0.35,
	[CheckStrictness.MEDIUM]: 0.2,
	[CheckStrictness.HIGH]: 0,
};

export function getCoefficient(strictness: CheckStrictness): number {
	const coefficient = StrictnessCoefficients[strictness];
	if (coefficient === undefined) {
		throw new Error(`coefficient for strictness ${strictness} not found`);
	}
	return coefficient;
}

export const CheckStrictnessFields = [
	CheckStrictness.LOW,
	CheckStrictness.MEDIUM,
	CheckStrictness.HIGH,
];

///

export interface IFBFile {
	path: string;
	name: string;
	extra?: any;
}

///

export interface IFBTextItem extends IStatement {
	type: FBItemType.Text;
	files?: IFBFile[];
}

///

export enum FBInputSize {
	Small = "SMALL",
	Normal = "NORMAL",
	WholeLine = "WHOLE-LINE",
	Large = "LARGE",
	ExtraLarge = "XL",
}

export const FBInputSizes = [
	FBInputSize.Small,
	FBInputSize.Normal,
	FBInputSize.WholeLine,
	FBInputSize.Large,
	FBInputSize.ExtraLarge,
];

interface IRInputItem {
	id: number;
	type: FBItemType.Input;
	size?: FBInputSize;
}
export interface IInputItem extends IRInputItem {
	score: number;
	correctInputs: IStatement[];
	checkStrictness: CheckStrictness;
}

///

export interface INonCheckableInputItem {
	id: number;
	type: FBItemType.NonCheckableInput;
	whoWillCheck: CheckerType;
	size?: FBInputSize;
	uploadFiles?: boolean;
}

///

export interface IFillingBlanksContent extends ICommonQuestionParts {
	type: ContentType.FillingBlanks;
	items: (IFBTextItem | IInputItem | INonCheckableInputItem)[];
	ignoreOrderOfInputs?: boolean;
	designStructure?: FBContentDesignStructure;
}

export interface IRFillingBlanksContent extends ICommonQuestionParts {
	type: ContentType.FillingBlanks;
	items: (IFBTextItem | IInputItem | INonCheckableInputItem)[];
	ignoreOrderOfInputs?: boolean;
	designStructure?: FBContentDesignStructure;
}

///

interface IFBItemUserAnswer extends IStatement {
	files?: IFBFile[];
}
export interface IFillingBlanksUserAns {
	[x: string]: IFBItemUserAnswer | undefined;
}
export interface StrictFillingBlanksEmptyContentSettings {
	designStructure?: FBContentDesignStructure;
}
