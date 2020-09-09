import { wrapAsPackageCusto } from "../../../../utils/shortcuts";
import { CommonPassable } from "../props/types";
import { TextComponent, Explanation } from "./providers";
import { CreateCusto } from "custo";

const defaultCommonComponents: CommonPassable["components"] = wrapAsPackageCusto(
	{
		Text: TextComponent,
		explanation: {
			Container: Explanation,
		},
	}
);

const defaultCommonTexts: CommonPassable["texts"] = {
	explanation: {
		Title: CreateCusto.Text("Explanation"),
	},
};

const defaultCommonFunctions: CommonPassable["functions"] = {};

export const reactDefaultCommonPassable: Pick<
	CommonPassable,
	"components" | "texts" | "functions"
> = {
	components: defaultCommonComponents,
	texts: defaultCommonTexts,
	functions: defaultCommonFunctions,
};
