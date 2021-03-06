/* eslint-disable react-hooks/rules-of-hooks */
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import { pickKeys } from "m-tests-core/lib/utils/objects";
import { areDeeplyEqual } from "m-tests-core/lib/utils/optimizations";
import {
	ContentCont,
	ItemAssessmentsCont,
	QuestionDisplaySettingsCont,
	UserAnswerCont,
} from "./contexts";

const useContentType = () =>
	ContentCont.useSelector(content => content.type, []);

const useExplanation = () =>
	ContentCont.useSelector(
		content => (content as IRawQuestionContent).explanation,
		[]
	);

const useUserAnswer = () => UserAnswerCont.useSelector(x => x.userAnswer, []);

const useUserAnswerChangeHanlder = () =>
	UserAnswerCont.useSelector(x => x.onChange, []);

const useUserAnswerDisplay = () =>
	UserAnswerCont.useSelector(
		x => pickKeys(x, "displayAnswer", "isDisabled"),
		areDeeplyEqual,
		[]
	);

const useContent = ContentCont.useValue;
const useItemAssessments = ItemAssessmentsCont.useValue;
const useQuestionDisplaySettings = QuestionDisplaySettingsCont.useValue;

export const commonHooks = {
	useContent,
	useContentType,
	useExplanation,
	useUserAnswer,
	useUserAnswerChangeHanlder,
	useUserAnswerDisplay,
	useItemAssessments,
	useQuestionDisplaySettings,
};
