import { DynamicContext } from "react-flexible-contexts";
import { IContentProps } from "../../interfaces";
import { ICommonQuestionParts } from "m-tests-core/lib/questions/common-schemas";

export const CommonQuestionPartsCont = DynamicContext.createDestructured<
	Omit<ICommonQuestionParts, "explanation">
>();

export const QuestionDisplaySettingsCont = DynamicContext.createDestructured<
	Pick<
		IContentProps<any>,
		| "disableEditingAnswer"
		| "displayAnswer"
		| "displayExplanation"
		| "shuffleKey"
		| "displayItemAssessments"
	>
>();

export const ItemAssessmentsCont = DynamicContext.createDestructured<{
	value: IContentProps<any>["itemsAssessments"];
	onChange: IContentProps<any>["onItemsAssessmentsChange"];
	display: IContentProps<any>["displayItemAssessments"];
}>();

export const UserAnswerCont = DynamicContext.createDestructured<{
	userAnswer: IContentProps<any>["userAnswer"];
	onChange: React.Dispatch<
		React.SetStateAction<IContentProps<any>["userAnswer"]>
	>;
	isDisabled: boolean;
	displayAnswer: boolean;
}>();

export const ContentCont = DynamicContext.create<
	IContentProps<any>["content"]
>();
ContentCont.setContextName("Content");
