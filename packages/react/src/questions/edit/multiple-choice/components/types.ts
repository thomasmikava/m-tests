import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import { IContentGeneralProps } from "../../../view/interfaces";

type IContent = IRawQuestionContent;

export interface MultipleChoiceNewContainerProps extends IContentGeneralProps {
	content: IContent;
}

export type MCEditBodyProps = IContentGeneralProps;
