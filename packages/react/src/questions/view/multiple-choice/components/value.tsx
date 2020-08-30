import { MCPassable } from "../props/types";
import { CreateCusto } from "custo";
import { pckgDefComponents } from "../../../../utils/shortcuts";
import { MCBody, MCStatement, MCChoices, MCSingleChoice, MCSingleChoiceDecoration } from "./providers";

export const reactDefaultMCPassable: Pick<MCPassable, "components" | "texts"> = {
    components: {
        Body: CreateCusto.hookOf.Component(() => pckgDefComponents.newComp(MCBody)),
        statement: {
            Container: pckgDefComponents.newComp(MCStatement),
        },
        choices: {
            Container: pckgDefComponents.newComp(MCChoices),
            single: {
                Container: pckgDefComponents.newComp(MCSingleChoice),
                Decoration: pckgDefComponents.newComp(MCSingleChoiceDecoration),
            },
        },
        explanation: {}
    },
    texts: {
        explanation: {},
    },
};
