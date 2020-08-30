import { MCEditPassable } from "m-tests-react/lib/questions/edit/multiple-choice/props/types";
import { pckgDefComponents } from "m-tests-react/lib/utils/shortcuts";
import styles from "./styles/index.module.css";
import { CreateCusto } from "custo";
import { useEditChoiceIcon, useEditSingleChoiceContainer } from "./providers";
import { CloseIcon } from "../../../icons/close";
import { reactDefaultMCEditPassable } from "m-tests-react/lib/questions/edit/multiple-choice/components/value";

const defaultMCEditPassableElements: MCEditPassable["elements"] = {
	HeadContainer: pckgDefComponents.newDivEl(),
	BodyContainer: pckgDefComponents.newDivEl(),
	TailContainer: pckgDefComponents.newDivEl(),
	Container: pckgDefComponents.newDivEl(),
	Containers: pckgDefComponents.newDivEl(),
	statement: {},
	choices: {
		Container: pckgDefComponents.newDivEl({
			className: styles["choices-container"],
		}),
		single: {
			Container: CreateCusto.hookOf.Component(
				useEditSingleChoiceContainer
			),
			TextContainer: pckgDefComponents.newDivEl({
				className: styles["choice-text-container"],
			}),
			left: {
				DecorationContainer: pckgDefComponents.newDivEl({
					className: styles["choice-decoration-container"],
				}),
				Icon: CreateCusto.hookOf.Component(useEditChoiceIcon),
			},
			right: {
				DecorationContainer: pckgDefComponents.newDivEl({
					className: styles["choice-right-decoration-container"],
				}),
				Icon: pckgDefComponents.newComp(CloseIcon),
			},
		},
		Button: pckgDefComponents.newHTMLEl("button"),
	},
	explanation: {},
};

export const defaultMCEditPassable: MCEditPassable = {
	components: reactDefaultMCEditPassable.components,
	elements: defaultMCEditPassableElements,
	texts: reactDefaultMCEditPassable.texts,
	hooks: reactDefaultMCEditPassable.hooks,
};
