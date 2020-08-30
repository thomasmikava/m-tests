import { MCEditGetterHooks } from "m-tests-react/lib/questions/edit/multiple-choice/hooks";
import { MCEditHooks } from "m-tests-react/lib/questions/edit/multiple-choice/components/index";
import { pckgDefComponents } from "m-tests-react/lib/utils/shortcuts";
import { useMemo } from "react";
import { CheckMarkIcon } from "../../../icons/checkmark";
import { joinClassNames } from "m-tests-react/lib/utils/classnames";
import styles from "./styles/index.module.css";

export const useEditSingleChoiceContainer = () => {
	const isCorrect = MCEditHooks.choices.isCurrentChoiceCorrect.use();
	const { canSelectMultiple } = MCEditGetterHooks.settings.use();
	return useMemo(() => {
		return pckgDefComponents.newDivEl({
			className: joinClassNames(
				styles["choice-container"],
				isCorrect && styles["correct-choice"],
				canSelectMultiple && styles["choice-can-select-multiple"]
			),
		});
	}, [isCorrect, canSelectMultiple]);
};

export const useEditChoiceIcon = () => {
	const isCorrect = MCEditHooks.choices.isCurrentChoiceCorrect.use();
	return useMemo(() => {
		if (!isCorrect) {
			return pckgDefComponents.newComp("div");
		}
		return pckgDefComponents.newComp(CheckMarkIcon);
	}, [isCorrect]);
};
