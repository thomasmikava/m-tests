import { IRawQuestionContent } from "@tests-core/schemas/questions/contnets/schemas";
import { IContentGeneralProps } from "new-tests/components/questions/view/interfaces";

type IContent = IRawQuestionContent;

export interface MultipleChoiceNewContainerProps extends IContentGeneralProps {
	content: IContent;
}

export type MCEditBodyProps = IContentGeneralProps;
