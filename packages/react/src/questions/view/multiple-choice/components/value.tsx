import { MCPassable } from "../props/types";
import { CreateCusto } from "custo";
import { pckgDefComponents } from "../../../../utils/shortcuts";
import { MCBody, MCStatement, MCChoices, MCSingleChoice, MCSingleChoiceDecoration } from "./providers";

export const reactDefaultMCPassable: Pick<MCPassable, "components" | "texts"> = {
    components: {
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
    },
    texts: {},
};
