import {
	IMultipleChoiceContent,
	IRMultipleChoiceContent,
} from "m-tests-core/lib/questions/multiple-choice/types";
import { IContentGeneralProps } from "../../interfaces";

type IContent = IRMultipleChoiceContent | IMultipleChoiceContent;

export interface MultipleChoiceNewContainerProps extends IContentGeneralProps {
	content: IContent;
}

export type MCBodyProps = IContentGeneralProps;

export type MCStatementProps = IContentGeneralProps;

export type MCChoicesProps = IContentGeneralProps;

export type MCSingleChoiceProps = IContentGeneralProps & {
	id: number;
	index: number;
};

export type MCSingleChoiceDecorationProps = IContentGeneralProps;
