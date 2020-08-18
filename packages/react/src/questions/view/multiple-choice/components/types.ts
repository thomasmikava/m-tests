import {
	IMultipleChoiceContent,
	IRMultipleChoiceContent,
} from "../../../../../../@tests-core/schemas/questions/contnets/multiple-choice/schema";
import { IContentGeneralProps } from "../../interfaces";

type IContent = IRMultipleChoiceContent | IMultipleChoiceContent;

export interface MultipleChoiceNewContainerProps extends IContentGeneralProps {
	content: IContent;
}

export type MCBodyProps = IContentGeneralProps;

export type MCStatementProps = IContentGeneralProps;

export type MCChoicesProps = IContentGeneralProps;

export type MCSingleChoiceProps = IContentGeneralProps & {
	choice: IContent["choices"][number];
};

export type MCSingleChoiceDecorationProps = IContentGeneralProps;
