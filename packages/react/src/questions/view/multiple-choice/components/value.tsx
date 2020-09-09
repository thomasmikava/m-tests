import { MCPassable } from "../props/types";
import { CreateCusto } from "custo";
import { wrapAsPackageCusto } from "../../../../utils/shortcuts";
import {
	MCBody,
	MCStatement,
	MCChoices,
	MCSingleChoice,
	MCSingleChoiceDecoration,
} from "./providers";

export const reactDefaultMCPassable: Pick<
	MCPassable,
	"components" | "texts"
> = {
	components: wrapAsPackageCusto({
		Body: CreateCusto.hookOf.Component(() => MCBody),
		statement: {
			Container: MCStatement,
		},
		choices: {
			Container: MCChoices,
			single: {
				Container: MCSingleChoice,
				Decoration: MCSingleChoiceDecoration,
			},
		},
		explanation: {},
	}),
	texts: {
		explanation: {},
	},
};
