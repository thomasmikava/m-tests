import MultipleChoice from "m-tests-core/lib/questions/multiple-choice/class";
import { shuffleArrayByKey } from "m-tests-core/lib/utils/shuffle";
import { pickKeys } from "m-tests-core/lib/utils/objects";
import { areDeeplyEqual } from "m-tests-core/lib/utils/optimizations";
import { useCallback, useMemo } from "react";
import { MCContentCont, MCChoiceCont } from "./contexts";
import { commonHooks } from "../../common/hooks";
import { IStatement } from "m-tests-core/lib/questions/common-schemas";
import { IRMultipleChoiceContent, IMultipleChoiceContent } from "m-tests-core/lib/questions/multiple-choice/types";
import { IContentProps } from "../../interfaces";

const useStatement = () =>
	MCContentCont.useSelector(content => content.statement, []);

const useRawChoices = () =>
	MCContentCont.useSelector(content => content.choices, []);

const useChoiceById = (id: number): (IRMultipleChoiceContent["choices"][number] | IMultipleChoiceContent["choices"][number]) =>
	MCContentCont.useSelector(content => content.choices.find(e => e.id === id)!, [id]);

const useChoicesCount = () =>
	MCContentCont.useSelector(content => content.choices.length, []);

const useCorrectAnswer = () =>
	MCContentCont.useSelector(
		content => {
			const choices = content.choices;
			const canSelectMultiple = content.canSelectMultiple;
			return {
				answer: MultipleChoice.getAnswer({
					choices,
					canSelectMultiple,
				}),
				canSelectMultiple,
			};
		},
		areDeeplyEqual,
		[]
	);

const useSettings = () =>
	MCContentCont.useSelector(
		content =>
			pickKeys(
				content,
				"allowPartialCredit",
				"canSelectMultiple",
				"designStructure",
				"disableShuffle"
			),
		areDeeplyEqual,
		[]
	);

const choicesShuffleFn = <T extends any>(arr: T[], { disableShuffle, shuffleKey }: Pick<IMultipleChoiceContent, "disableShuffle"> & Pick<IContentProps<any>, "shuffleKey">): T[] => {
	if (disableShuffle || shuffleKey === undefined) return arr;
	return shuffleArrayByKey(arr, shuffleKey);
}

const useChoices = () => {
	const { shuffleKey } = commonHooks.useQuestionDisplaySettings();
	const { disableShuffle } = useSettings();
	const choises = useRawChoices();
	return useMemo(() => choicesShuffleFn(choises, { disableShuffle, shuffleKey }), [choises, shuffleKey, disableShuffle]);
};

const useChoiceIds = () => {
	const { shuffleKey } = commonHooks.useQuestionDisplaySettings();
	const { disableShuffle } = useSettings();
	return MCContentCont.useSelector(content => {
		const choiseIds = (content.choices as IStatement[]).map(e => e.id);
		return choicesShuffleFn(choiseIds, { disableShuffle, shuffleKey })
	}, [shuffleKey, disableShuffle]);
};

const useChoiceState = (choiceId: number) => {
	const userAnswer = commonHooks.useUserAnswer();
	const { isDisabled, displayAnswer } = commonHooks.useUserAnswerDisplay();
	const { answer: correctAnswer, canSelectMultiple } = useCorrectAnswer();

	const isUnanswered = useMemo(() => {
		if (userAnswer === null || userAnswer === undefined) return true;
		if (!canSelectMultiple) {
			return typeof userAnswer !== "number";
		}
		return !Array.isArray(userAnswer) || userAnswer.length === 0;
	}, [userAnswer, canSelectMultiple]);

	const isChecked = useMemo(() => {
		if (userAnswer === null || userAnswer === undefined) return false;
		if (typeof userAnswer === "number") return userAnswer === choiceId;
		if (Array.isArray(userAnswer)) {
			return userAnswer.indexOf(choiceId) > -1;
		}
		return false;
	}, [userAnswer, choiceId]);

	const isCorrectChoice = useMemo(() => {
		if (!displayAnswer || correctAnswer === null) return null;
		return MultipleChoice.isCorrectChoice({
			choiceId,
			correctAnswer,
		});
	}, [correctAnswer, displayAnswer, choiceId]);

	const isFullyCorrectlyAnswered = useMemo(() => {
		if (!displayAnswer || correctAnswer === null) return null;
		return MultipleChoice.isFullyCorrectlyAnswered({
			correctAnswer,
			userAnswer,
		});
	}, [correctAnswer, displayAnswer, userAnswer]);

	return {
		isDisabled,
		displayAnswer,
		isChecked,
		isCorrectChoice,
		isFullyCorrectlyAnswered,
		canSelectMultiple,
		isUnanswered,
	};
};

const useOnChoiceCheck = (choiceId: number) => {
	const { canSelectMultiple } = useSettings();
	const onChange = commonHooks.useUserAnswerChangeHanlder();
	const { isDisabled } = commonHooks.useUserAnswerDisplay();
	return useCallback(() => {
		if (isDisabled) return;
		if (!canSelectMultiple) {
			onChange(choiceId);
			return;
		}
		onChange(olsAns => {
			if (!Array.isArray(olsAns)) return [choiceId];
			if (olsAns.indexOf(choiceId) === -1) {
				return [...olsAns, choiceId];
			}
			return olsAns.filter((ch, i) => ch !== choiceId);
		});
	}, [canSelectMultiple, choiceId, isDisabled, onChange]);
};

const useChoiceId = () => MCChoiceCont.useProperty("id");

export const mcHooks = {
	useStatement,
	useChoices,
	useChoicesCount,
	useChoiceIds,
	useChoiceById,
	useSettings,
	useChoiceState,
	useCorrectAnswer,
	useOnChoiceCheck,
	useChoiceId,
	choicesShuffleFn,
};
