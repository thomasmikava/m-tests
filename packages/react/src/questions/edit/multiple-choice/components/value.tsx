import { mcDefaultEditHooks } from "../hooks";
import { MCEditPassable } from "../props/types";
import { CreateCusto } from "custo";
import { wrapAsPackageCusto } from "../../../../utils/shortcuts";
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
import { ToVeryGeneralCusto } from "custo/lib/utils/prop-generics";

const useSingleChoicePlaceholderText = (): string => {
	const isCorrect = mcDefaultEditHooks.choices.isCurrentChoiceCorrect.use();
	if (isCorrect) return "Correct Choice";
	return "Another choice";
};

export const reactDefaultMCEditPassable: ToVeryGeneralCusto<Pick<
	MCEditPassable,
	"components" | "texts" | "hooks"
>> = {
	components: wrapAsPackageCusto({
		Head: MCEditHead,
		Body: CreateCusto.hookOf.Component(() => MCEditBody),
		Tail: MCEditTail,
		statement: {
			Container: MCEditStatement,
		},
		choices: {
			Container: MCEditChoices,
			single: {
				Container: MCEditSingleChoice,
				LeftDecoration: MCEditSingleChoiceDecoration,
				RightDecoration: MCEditSingleChoiceDecoration,
			},
			AddChoice: MCEditAddChoiceButton,
		},
		explanation: {},
	}),
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
