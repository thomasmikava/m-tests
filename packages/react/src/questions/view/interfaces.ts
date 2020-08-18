import {
	IRQuestionContent,
	IRawQuestionContent,
} from "m-tests-core/lib/questions/schemas";
import { IQuestionItemsAssessment } from "m-tests-core/lib/questions/helper-schemas";
import { ContentPath } from "m-tests-core/lib/utils/path";

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
