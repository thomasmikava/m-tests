import { CreateCusto, CustoType } from "custo";
import { ToCustoTreeObj } from "custo/lib/classes/helper-fns/tree";
import { useNormalizedQuestionContextSelector } from "../../customizations/providers";
import { CommonPassable } from "../props/types";

export const CommonOnes: ToCustoTreeObj<CommonPassable> = {
	components: {
		Text: CustoType.component,
		explanation: {
			Container: CustoType.component,
			Text: CustoType.component,
		},
	},
	elements: {
		OuterContainer: CustoType.component,
		BodyContainer: CustoType.component,
		Text: CustoType.component,
		InnerContainers: CustoType.component,
		explanation: {
			Container: CustoType.component,
			Title: CustoType.component,
			Body: CustoType.component,
			Text: CustoType.component,
		},
	},
	texts: {
		explanation: {
			Title: CustoType.text,
		},
	},
	functions: {
	},
	hooks: {
		contentTextTransformer: CustoType.hook,
		nonContentTextTransformer: CustoType.hook,
	},
};

export const getTextTransformationHook = () =>
	Common.hooks.nonContentTextTransformer;

export const Common = CreateCusto.Tree<CommonPassable>(
	CommonOnes as any,
	useNormalizedQuestionContextSelector,
	{
		prefixes: ["common"],
		getTextTransformationHook,
		defaultValue: {
			hooks: {
				contentTextTransformer: CreateCusto.Hook(x => x),
				nonContentTextTransformer: CreateCusto.Hook(x => x),
			}
		}
	}
);

export const CommonComps = Common.components;

export const CommonElements = Common.elements;

export const CommonFunctions = Common.functions;

export const CommonHooks = Common.hooks;

export const CommonTexts = Common.texts;
