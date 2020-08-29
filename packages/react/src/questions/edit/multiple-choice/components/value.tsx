import { mcEditHooks } from "../hooks";
import { MCEditPassable } from "../props/types";
import { CreateCusto } from "custo";
import { pckgDefComponents } from "../../../../utils/shortcuts";
import { MCEditHead, MCEditBody, MCEditTail, MCEditStatement, MCEditChoices, MCEditSingleChoice, MCEditSingleChoiceDecoration, MCEditSingleChoiceRightDecoration, MCEditAddChoiceButton } from "./providers";

const useSingleChoicePlaceholderText = (): string => {
	const isCorrect = mcEditHooks.useIsCurrentChoiceCorrect();
	if (isCorrect) return "Correct Choice";
	return "Another choice";	
}

export const reactDefaultMCEditPassable: Pick<MCEditPassable, "components" | "texts"> = {
    components: {
        head: pckgDefComponents.newComp(MCEditHead),
        body: CreateCusto.hookOf.Component(() =>
            pckgDefComponents.newComp(MCEditBody)
        ),
        tail: pckgDefComponents.newComp(MCEditTail),
        statement: {
            container: pckgDefComponents.newComp(MCEditStatement),
        },
        choices: {
            container: pckgDefComponents.newComp(MCEditChoices),
            single: {
                container: pckgDefComponents.newComp(MCEditSingleChoice),
                decoration: pckgDefComponents.newComp(MCEditSingleChoiceDecoration),
                rightDecoration: pckgDefComponents.newComp(MCEditSingleChoiceRightDecoration),
            },
            addChoice: pckgDefComponents.newComp(MCEditAddChoiceButton),
        },
        explanation: {
        },
    },
    texts: {
        statement: {
            placeholder: CreateCusto.Data("Statement"),
        },
        choices: {
            addChoice: CreateCusto.Text("Add choice"),
            single: {
                placeholder: CreateCusto.hookOf.Data(useSingleChoicePlaceholderText),
            }
        },
        canSelectMultiple: CreateCusto.Text("Allow Multiple Select"),
        disableShuffle: CreateCusto.Text("Disable Shuffle"),
        allowPartialCredit: CreateCusto.Text("Allow Partial Credits"),
    },
};
