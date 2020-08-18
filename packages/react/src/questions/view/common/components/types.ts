import { IContentGeneralProps } from "../../interfaces";
import { IStatement } from "../../../../../content/questions/common-schemas";

export type TextComponentProps = IContentGeneralProps & {
	stat: IStatement;
};

export type ExplanationProps = IContentGeneralProps & {
	forcefullyDisplay?: boolean;
};
