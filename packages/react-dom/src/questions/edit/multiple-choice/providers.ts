import { MCEditGetterHooks } from "m-tests-react/lib/questions/edit/multiple-choice/hooks";
import { MCEditHooks } from "m-tests-react/lib/questions/edit/multiple-choice/components/index";
import { cDom } from "../../utils";
import { useMemo } from "react";
import { CheckMarkIcon } from "../../../icons/checkmark";
import styles from "./styles/index.module.css";

export const useEditSingleChoiceContainer = () => {
	const isCorrect = MCEditHooks.choices.isCurrentChoiceCorrect.use();
	const { canSelectMultiple } = MCEditGetterHooks.settings.use();
	return useMemo(() => {
		return cDom.newClassedDiv(
			styles["choice-container"],
			isCorrect && styles["correct-choice"],
			canSelectMultiple && styles["choice-can-select-multiple"]
		);
	}, [isCorrect, canSelectMultiple]);
};

export const useEditChoiceIcon = () => {
	const isCorrect = MCEditHooks.choices.isCurrentChoiceCorrect.use();
	return useMemo(() => {
		if (!isCorrect) {
			return cDom.newComp("div");
		}
		return cDom.newComp(CheckMarkIcon);
	}, [isCorrect]);
};
