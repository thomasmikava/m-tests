import { mcEditHooks } from "m-tests-react/lib/questions/edit/multiple-choice/hooks";
import { pckgDefComponents } from "m-tests-react/lib/utils/shortcuts";
import { useMemo } from "react";
import { CheckMarkIcon } from "../../../icons/checkmark";
import { joinClassNames } from "m-tests-react/lib/utils/classnames";
import styles from "./styles/index.module.css";

export const useEditSingleChoiceContainer = () => {
	const isCorrect = mcEditHooks.useIsCurrentChoiceCorrect();
	const { canSelectMultiple } = mcEditHooks.useSettings();
	return useMemo(() => {
        return pckgDefComponents.newDivEl({
			className: joinClassNames(
                styles["choice-container"],
                isCorrect && styles["correct-choice"],
                canSelectMultiple &&
                    styles["choice-can-select-multiple"],
            ),
		});
	}, [isCorrect, canSelectMultiple]);
}

export const useEditChoiceIcon = () => {
	const isCorrect = mcEditHooks.useIsCurrentChoiceCorrect();
	return useMemo(() => {
		if (!isCorrect) {
			return pckgDefComponents.newComp("div");
        }
        return pckgDefComponents.newComp(CheckMarkIcon);
	}, [isCorrect]);
};
