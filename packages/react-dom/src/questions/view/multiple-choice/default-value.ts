import { pckgDefComponents } from "m-tests-react/lib/utils/shortcuts";
import { CounterComponent } from "m-tests-react/lib/questions/view/a";
import { reactDefaultMCPassable } from "m-tests-react/lib/questions/view/multiple-choice/components/value";
import styles from "./styles/index.module.css";
import { MCPassable } from "m-tests-react/lib/questions/view/multiple-choice/props/types";
import { CreateCusto } from "custo";
import { useChoiceIcon, useSingleChoiceContainer } from "./providers";

const Texts = pckgDefComponents.newDivEl({ style: { color: "red" } });

const defaultMCPassableElements: MCPassable["elements"] = {
	statement: {
		Container: pckgDefComponents.newDivEl({
			style: { boxShadow: "rgba(0,0,0,0.5) 0 0 10px inset" },
		}),
		Text: Texts,
	},
	choices: {
		Container: pckgDefComponents.newDivEl(
			{
				className: styles["choices-container"],
			},
			{
				innerStartComponents: pckgDefComponents.newComp(
					CounterComponent,
					{ title: "Choices container Inner" }
				),
			}
		),
		single: {
			Container: CreateCusto.hookOf.Component(useSingleChoiceContainer),
			TextContainer: pckgDefComponents.newDivEl({
				className: styles["choice-text-container"],
			}),
			DecorationContainer: pckgDefComponents.newDivEl({
				className: styles["choice-decoration-container"],
			}),
			Icon: CreateCusto.hookOf.Component(useChoiceIcon),
		},
	},
	explanation: {
		Container: pckgDefComponents.newHTMLEl("span", {
			style: { boxShadow: "rgba(0,0,0,0.8) 0 0 10px 25px" },
		}),
		Text: pckgDefComponents.newDivEl({
			style: { color: "blue", fontWeight: "bold" },
		}),
	},
};

export const defaultMCPassable: MCPassable = {
	components: reactDefaultMCPassable.components,
	elements: defaultMCPassableElements,
	texts: reactDefaultMCPassable.texts,
};
