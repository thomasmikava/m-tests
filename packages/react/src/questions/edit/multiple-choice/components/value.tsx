import { mcDefaultEditHooks } from "../hooks";
import { MCEditPassable } from "../props/types";
import { CreateCusto } from "custo";
import { pckgDefComponents } from "../../../../utils/shortcuts";
import {
	MCEditHead,
	MCEditBody,
	MCEditTail,
	MCEditStatement,
	MCEditChoices,
	MCEditSingleChoice,
	MCEditSingleChoiceDecoration,
	MCEditAddChoiceButton,
} from "./providers";

const useSingleChoicePlaceholderText = (): string => {
	const isCorrect = mcDefaultEditHooks.choices.isCurrentChoiceCorrect.use();
	if (isCorrect) return "Correct Choice";
	return "Another choice";
};

export const reactDefaultMCEditPassable: Pick<
	MCEditPassable,
	"components" | "texts" | "hooks"
> = {
	components: {
		Head: pckgDefComponents.newComp(MCEditHead),
		Body: CreateCusto.hookOf.Component(() =>
			pckgDefComponents.newComp(MCEditBody)
		),
		Tail: pckgDefComponents.newComp(MCEditTail),
		statement: {
			Container: pckgDefComponents.newComp(MCEditStatement),
		},
		choices: {
			Container: pckgDefComponents.newComp(MCEditChoices),
			single: {
				Container: pckgDefComponents.newComp(MCEditSingleChoice),
				LeftDecoration: pckgDefComponents.newComp(
					MCEditSingleChoiceDecoration
				),
				RightDecoration: pckgDefComponents.newComp(
					MCEditSingleChoiceDecoration
				),
			},
			AddChoice: pckgDefComponents.newComp(MCEditAddChoiceButton),
		},
		explanation: {},
	},
	texts: {
		statement: {
			Placeholder: CreateCusto.Data("Statement"),
		},
		choices: {
			AddChoice: CreateCusto.Text("Add choice"),
			single: {
				Placeholder: CreateCusto.hookOf.Data(
					useSingleChoicePlaceholderText
				),
			},
		},
		CanSelectMultiple: CreateCusto.Text("Allow Multiple Select"),
		DisableShuffle: CreateCusto.Text("Disable Shuffle"),
		AllowPartialCredit: CreateCusto.Text("Allow Partial Credits"),
	},
	hooks: {},
};
