import {
	MCEditPassable,
} from "m-tests-react/lib/questions/edit/multiple-choice/props/types";
import { pckgDefComponents } from "m-tests-react/lib/utils/shortcuts";
import styles from "./styles/index.module.css";
import { CreateCusto } from "custo";
import { useEditChoiceIcon, useEditSingleChoiceContainer } from "./providers";
import { CloseIcon } from "../../../icons/close";
import { reactDefaultMCEditPassable } from "m-tests-react/lib/questions/edit/multiple-choice/components/value";

const defaultMCEditPassableElements: MCEditPassable["elements"] = {
	headContainer: pckgDefComponents.newDivEl(),
	bodyContainer: pckgDefComponents.newDivEl(),
	tailContainer: pckgDefComponents.newDivEl(),
	container: pckgDefComponents.newDivEl(),
	containers: pckgDefComponents.newDivEl(),
	statement: {
	},
	choices: {
		container: pckgDefComponents.newDivEl({
			className: styles["choices-container"],
		}),
		single: {
			container: CreateCusto.hookOf.Component(useEditSingleChoiceContainer),
			textContainer: pckgDefComponents.newDivEl({
				className: styles["choice-text-container"],
			}),
			decorationContainer: pckgDefComponents.newDivEl({
				className: styles["choice-decoration-container"],
			}),
			icon: CreateCusto.hookOf.Component(useEditChoiceIcon),
			rightDecorationContainer: pckgDefComponents.newDivEl({
				className: styles["choice-right-decoration-container"],
			}),
			rightIcon: pckgDefComponents.newComp(CloseIcon),
		},
		button: pckgDefComponents.newHTMLEl("button"),
	},
	explanation: {
	},
};

export const defaultMCEditPassable: MCEditPassable = {
	components: reactDefaultMCEditPassable.components,
	elements: defaultMCEditPassableElements,
	texts: reactDefaultMCEditPassable.texts,
};
