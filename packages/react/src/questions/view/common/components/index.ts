import { CreateCusto, CustoType } from "custo";
import { ToCustoTreeObj } from "custo/lib/classes/helper-fns/tree";
import { useNormalizedQuestionContextSelector } from "../../customizations/providers";
import { CommonPassable } from "../props/types";

const CommonOnes: ToCustoTreeObj<CommonPassable> = {
	components: {
		text: CustoType.component,
		explanation: {
			container: CustoType.component,
			text: CustoType.component,
		},
	},
	elements: {
		outerContainer: CustoType.component,
		bodyContainer: CustoType.component,
		text: CustoType.component,
		innerContainers: CustoType.component,
		explanation: {
			container: CustoType.component,
			title: CustoType.component,
			body: CustoType.component,
			text: CustoType.component,
		},
	},
	functions: {
		useContentTextTransformer: CustoType.data,
		useNonContentTextTransformer: CustoType.data,
	},
	texts: {
		explanation: {
			title: CustoType.data,
		},
	},
};

export const getTextTransformationHook = () =>
	Common.functions.useNonContentTextTransformer;

export const Common = CreateCusto.Tree<CommonPassable>(
	CommonOnes as any,
	useNormalizedQuestionContextSelector,
	{
		prefixes: ["common"],
		getTextTransformationHook,
	}
);

export const CommonComps = Common.components;

export const CommonElements = Common.elements;

export const CommonFunctions = Common.functions;

export const CommonTexts = Common.texts;
