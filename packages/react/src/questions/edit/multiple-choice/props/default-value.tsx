import {
	MCEditPassableComponents,
	MCEditPassableElements,
	MCEditPassableTexts,
	MCEditPassable,
} from "./types";
import { pckgDefComponents } from "new-tests/utils/shortcuts";
import { MCEditBody } from "../components/providers";
import styles from "../styles/index.module.css";
import { removeKeys } from "new-tests/utils/objects";
import { CreateCusto } from "custo";

const defaultMCEditPassableComponents: MCEditPassableComponents = {
	body: CreateCusto.hookOf.Component(() =>
		pckgDefComponents.newComp(MCEditBody)
	),
};

const defaultMCEditPassableElements: MCEditPassableElements = {
	statement: {
		text: pckgDefComponents.newDivEl({ style: { color: "red" } }),
	},
	choices: {
		container: pckgDefComponents.newDivEl({
			className: styles["choices-container"],
		}),
		single: {
			container: pckgDefComponents.newComp(
				"div",
				{},
				{ transformProps: props => removeKeys(props, "choiceId") }
			),
			text: pckgDefComponents.newDivEl({
				style: { color: "green" },
			}),
			textContainer: pckgDefComponents.newComp(
				"div",
				{
					className: styles["choice-text-container"],
				} as { className: string; choiceId: number },
				{ transformProps: props => removeKeys(props, "choiceId") }
			),
			decorationContainer: pckgDefComponents.newComp(
				"div",
				{
					className: styles["choice-decoration-container"],
				} as { className: string; choiceId: number },
				{ transformProps: props => removeKeys(props, "choiceId") }
			),
		},
	},
	explanation: {
		text: pckgDefComponents.newDivEl({ style: { color: "blue" } }),
	},
};

const defaultMCEditPassableTexts: MCEditPassableTexts = {};

export const defaultMCEditPassable: MCEditPassable = {
	components: defaultMCEditPassableComponents,
	elements: defaultMCEditPassableElements,
	texts: defaultMCEditPassableTexts,
};
