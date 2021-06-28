import { cDom } from "../../utils";
import { reactDefaultMCPassable } from "m-tests-react/lib/questions/view/multiple-choice/components/value";
import styles from "./styles/index.module.css";
import { MCPassable } from "m-tests-react/lib/questions/view/multiple-choice/props/types";
import { CreateCusto } from "custo";
import { useChoiceIcon, useSingleChoiceContainer } from "./providers";
import { ToVeryGeneralCusto } from "custo/lib/utils/prop-generics";
import { wrapAsPackageCusto } from "m-tests-react/lib/utils/shortcuts";

const defaultMCPassableElements: ToVeryGeneralCusto<MCPassable["elements"]> = cDom.asComp(
	{
		statement: {
			Container: cDom.div,
			Text: cDom.div,
		},
		choices: {
			Container: cDom.newClassedDiv(styles["choices-container"]),
			single: {
				Container: CreateCusto.hookOf.Component(
					useSingleChoiceContainer
				),
				TextContainer: cDom.newClassedDiv(
					styles["choice-text-container"]
				),
				DecorationContainer: cDom.newClassedDiv(
					styles["choice-decoration-container"]
				),
				Icon: CreateCusto.hookOf.Component(useChoiceIcon),
			},
		},
		explanation: {
			Container: cDom.newHTML("span"),
			Text: cDom.div,
		},
	}
);

export const defaultMCPassable: ToVeryGeneralCusto<MCPassable> = {
	components: wrapAsPackageCusto(reactDefaultMCPassable.components),
	elements: wrapAsPackageCusto(defaultMCPassableElements),
	texts: reactDefaultMCPassable.texts,
};
