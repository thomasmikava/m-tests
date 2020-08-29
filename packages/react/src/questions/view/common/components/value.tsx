import { pckgDefComponents } from "../../../../utils/shortcuts";
import { CommonPassable } from "../props/types";
import { TextComponent, Explanation } from "./providers";
import { CreateCusto } from "custo";

const defaultCommonComponents: CommonPassable["components"] = {
	text: pckgDefComponents.newComp(TextComponent),
	explanation: {
		container: pckgDefComponents.newComp(Explanation),
	},
};

const defaultCommonTexts: CommonPassable["texts"] = {
	explanation: {
		title: CreateCusto.Text("Explanation"),
	},
};


const defaultCommonFunctions: CommonPassable["functions"] = {
};

export const reactDefaultCommonPassable: Pick<CommonPassable, "components" | "texts" | "functions"> = {
	components: defaultCommonComponents,
	texts: defaultCommonTexts,
	functions: defaultCommonFunctions
};
