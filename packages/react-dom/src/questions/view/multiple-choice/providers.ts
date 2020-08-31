import { CounterComponent } from "m-tests-react/lib/questions/view/a";
import {
	mcHooks,
	MCGetterHooks,
} from "m-tests-react/lib/questions/view/multiple-choice/hooks";
import { joinClassNames } from "m-tests-react/lib/utils/classnames";
import { pckgDefComponents } from "m-tests-react/lib/utils/shortcuts";
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
	return pckgDefComponents.newDivEl(
		{
			className: joinClassNames(
				styles["choice-container"],
				isChecked && styles["checked-choice"],
				isDisabled && styles["disabled-choice"],
				isCorrectChoice && styles["correct-choice"],
				canSelectMultiple && styles["choice-can-select-multiple"],
				isFullyCorrectlyAnswered && styles["fully-correctly-answered"],
				isUnanswered && styles["unanswered"]
			),
		},
		{
			outerBeforeComponents: pckgDefComponents.newComp(CounterComponent, {
				title: "SingleChoice",
			}),
		}
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
			return pckgDefComponents.newComp("div");
		}
		if (isCorrectChoice) {
			return pckgDefComponents.newComp(CheckMarkIcon);
		}
		return pckgDefComponents.newComp(CloseIcon);
	}, [displayAnswer, isChecked, isCorrectChoice]);
};
