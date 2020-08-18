import { CreateCusto, CustoType } from "custo";
import { ToCustoTreeObj } from "custo/lib/classes/helper-fns/tree";
import { useNormalizedQuestionEditContextSubscriber } from "../../customizations/providers";
import { CommonEditPassable } from "../props/types";

const CommonEditOnes: ToCustoTreeObj<CommonEditPassable> = {
	components: {
		text: CustoType.component,
		explanation: {
			container: CustoType.component,
			text: CustoType.component,
		},
	},
	elements: {
		outerContainer: CustoType.component,
	},
	functions: {
		useContentTextTransformer: CustoType.data,
		useNonContentTextTransformer: CustoType.data,
	},
	texts: {
		explanation: {
			title: CustoType.text,
		},
		contentTypes: CustoType.data,
	},
};

export const CommonEdit = CreateCusto.Tree<CommonEditPassable>(
	CommonEditOnes as any,
	useNormalizedQuestionEditContextSubscriber,
	{ prefixes: ["common"] }
);
