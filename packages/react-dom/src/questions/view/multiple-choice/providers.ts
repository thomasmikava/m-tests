import {
	mcHooks,
	MCGetterHooks,
} from "m-tests-react/lib/questions/view/multiple-choice/hooks";
import { cDom } from "../../utils";
import { useMemo } from "react";
import { CheckMarkIcon } from "../../../icons/checkmark";
import { CloseIcon } from "../../../icons/close";
import styles from "./styles/index.module.css";

export const useSingleChoiceContainer = () => {
	const choiceId = MCGetterHooks.currentChoiceId.use();
	const {
		isChecked,
		isDisabled,
		isCorrectChoice,
		isFullyCorrectlyAnswered,
		canSelectMultiple,
		isUnanswered,
	} = mcHooks.useChoiceState.use(choiceId);
	return cDom.newClassedDiv(
		styles["choice-container"],
		isChecked && styles["checked-choice"],
		isDisabled && styles["disabled-choice"],
		isCorrectChoice && styles["correct-choice"],
		canSelectMultiple && styles["choice-can-select-multiple"],
		isFullyCorrectlyAnswered && styles["fully-correctly-answered"],
		isUnanswered && styles["unanswered"]
	);
};

export const useChoiceIcon = () => {
	const choiceId = MCGetterHooks.currentChoiceId.use();
	const {
		displayAnswer,
		isChecked,
		isCorrectChoice,
		isUnanswered,
	} = mcHooks.useChoiceState.use(choiceId);
	return useMemo(() => {
		if (!displayAnswer || (!isCorrectChoice && !isChecked)) {
			return cDom.newDiv();
		}
		if (isCorrectChoice) {
			return cDom.newComp(CheckMarkIcon);
		}
		return cDom.newComp(CloseIcon);
	}, [displayAnswer, isChecked, isCorrectChoice]);
};
