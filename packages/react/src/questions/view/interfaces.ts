import {
	IRQuestionContent,
	IRawQuestionContent,
} from "@tests-core/schemas/questions/contnets/schemas";
import { IQuestionItemsAssessment } from "@tests-core/schemas/questions/helper-schemas";
import { ContentPath } from "new-tests/utils/path";

export interface IContentProps<U> {
	content: IRQuestionContent | IRawQuestionContent;
	onUserAnswerChange: (userAnswer: U) => void;
	userAnswer?: U;
	shuffleKey?: number;
	displayAnswer: boolean;
	displayExplanation: boolean;
	disableEditingAnswer?: boolean;
	displayItemAssessments?: boolean;
	itemsAssessments?: IQuestionItemsAssessment;
	onItemsAssessmentsChange?: (newVal: IQuestionItemsAssessment) => void;
}

export interface IContentGeneralProps {
	path: ContentPath;
}
