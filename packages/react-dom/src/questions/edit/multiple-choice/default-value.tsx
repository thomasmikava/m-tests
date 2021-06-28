import { MCEditPassable } from "m-tests-react/lib/questions/edit/multiple-choice/props/types";
import styles from "./styles/index.module.css";
import { CreateCusto } from "custo";
import { useEditChoiceIcon, useEditSingleChoiceContainer } from "./providers";
import { CloseIcon } from "../../../icons/close";
import { reactDefaultMCEditPassable } from "m-tests-react/lib/questions/edit/multiple-choice/components/value";
import { cDom } from "../../utils";
import { ToVeryGeneralCusto } from "custo/lib/utils/prop-generics";
import { wrapAsPackageCusto } from "m-tests-react/lib/utils/shortcuts";

const defaultMCEditPassableElements: ToVeryGeneralCusto<MCEditPassable["elements"]> = cDom.asComp(
	{
		HeadContainer: cDom.div,
		BodyContainer: cDom.div,
		TailContainer: cDom.div,
		Container: cDom.div,
		Containers: cDom.div,
		statement: {},
		choices: {
			Container: cDom.newClassedDiv(styles["choices-container"]),
			single: {
				Container: CreateCusto.hookOf.Component(
					useEditSingleChoiceContainer
				),
				TextContainer: cDom.newClassedDiv(
					styles["choice-text-container"]
				),
				left: {
					DecorationContainer: cDom.newClassedDiv(
						styles["choice-decoration-container"]
					),
					Icon: CreateCusto.hookOf.Component(useEditChoiceIcon),
				},
				right: {
					DecorationContainer: cDom.newClassedDiv(
						styles["choice-right-decoration-container"]
					),
					Icon: CloseIcon,
				},
			},
			Button: cDom.newHTML("button"),
		},
		explanation: {},
	}
);

export const defaultMCEditPassable: ToVeryGeneralCusto<MCEditPassable> = {
	components: wrapAsPackageCusto(reactDefaultMCEditPassable.components),
	elements: wrapAsPackageCusto(defaultMCEditPassableElements),
	texts: reactDefaultMCEditPassable.texts,
	hooks: reactDefaultMCEditPassable.hooks,
};
