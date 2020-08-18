import { joinClassNames } from "m-tests-react/lib/utils/classnames";
import { pckgDefComponents } from "m-tests-react/lib/utils/shortcuts";
import { CounterComponent } from "m-tests-react/lib/questions/view/a";
import {
	MCBody,
	MCChoices,
	MCSingleChoice,
	MCSingleChoiceDecoration,
	MCStatement,
} from "m-tests-react/lib/questions/view/multiple-choice/components/providers";
import { mcHooks } from "m-tests-react/lib/questions/view/multiple-choice/hooks";
import styles from "./styles/index.module.css";
import {
	MCPassableComponents,
	MCPassableElements,
	MCPassableTexts,
	MCPassable,
} from "m-tests-react/lib/questions/view/multiple-choice/props/types";
import { CreateCusto } from "custo";

const defaultMCPassableComponents: MCPassableComponents = {
	body: CreateCusto.hookOf.Component(() => pckgDefComponents.newComp(MCBody)),
	statement: {
		container: pckgDefComponents.newComp(MCStatement),
	},
	choices: {
		container: pckgDefComponents.newComp(MCChoices),
		single: {
			container: pckgDefComponents.newComp(MCSingleChoice),
			decoration: pckgDefComponents.newComp(MCSingleChoiceDecoration),
		},
	},
};

const Texts = pckgDefComponents.newDivEl({ style: { color: "red" } });

const defaultMCPassableElements: MCPassableElements = {
	statement: {
		container: pckgDefComponents.newDivEl({
			style: { boxShadow: "rgba(0,0,0,0.5) 0 0 10px inset" },
		}),
		text: Texts,
	},
	choices: {
		container: pckgDefComponents.newDivEl(
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
			container: CreateCusto.hookOf.Component(() => {
				const choiceId = mcHooks.useChoiceId();
				const {
					isChecked,
					isDisabled,
					isCorrectChoice,
					isFullyCorrectlyAnswered,
					canSelectMultiple,
					isUnanswered,
				} = mcHooks.useChoiceState(choiceId);
				return pckgDefComponents.newDivEl(
					{
						className: joinClassNames(
							styles["choice-container"],
							isChecked && styles["checked-choice"],
							isDisabled && styles["disabled-choice"],
							isCorrectChoice && styles["correct-choice"],
							canSelectMultiple &&
								styles["choice-can-select-multiple"],
							isFullyCorrectlyAnswered &&
								styles["fully-correctly-answered"],
							isUnanswered && styles["unanswered"]
						),
					},
					{
						outerBeforeComponents: pckgDefComponents.newComp(
							CounterComponent,
							{
								title: "SingleChoice",
							}
						),
					}
				);
			}),
			text: pckgDefComponents.newDivEl({
				style: { color: "green" },
			}),
			textContainer: pckgDefComponents.newDivEl({
				className: styles["choice-text-container"],
			}),
			decorationContainer: pckgDefComponents.newDivEl({
				className: styles["choice-decoration-container"],
			}),
		},
	},
	explanation: {
		container: pckgDefComponents.newHTMLEl("span", {
			style: { boxShadow: "rgba(0,0,0,0.8) 0 0 10px 25px" },
		}),
		text: pckgDefComponents.newDivEl({
			style: { color: "blue", fontWeight: "bold" },
		}),
	},
};

const defaultMCPassableTexts: MCPassableTexts = {};

export const defaultMCPassable: MCPassable = {
	components: defaultMCPassableComponents,
	elements: defaultMCPassableElements,
	texts: defaultMCPassableTexts,
};
