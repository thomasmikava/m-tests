import { IContentGeneralProps } from "../../interfaces";
import { IStatement } from "m-tests-core/lib/questions/common-schemas";

export type TextComponentProps = IContentGeneralProps & {
	stat: IStatement;
};

export type ExplanationProps = IContentGeneralProps & {
	forcefullyDisplay?: boolean;
};
