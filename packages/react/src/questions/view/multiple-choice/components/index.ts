import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { CreateCusto, CustoType } from "custo";
import { ToCustoTreeObj } from "custo/lib/classes/helper-fns/tree";
import { useNormalizedQuestionContextSelector } from "../../customizations/providers";
import { MCPassable } from "../props/types";
import { getTextTransformationHook, CommonOnes } from "../../common/components";

const MCOnes: ToCustoTreeObj<MCPassable> = {
	components: {
		Body: CustoType.component,
		statement: {
			Container: CustoType.component,
			Text: CustoType.component,
		},
		choices: {
			Container: CustoType.component,
			single: {
				Container: CustoType.component,
				Decoration: CustoType.component,
				Text: CustoType.component,
			},
		},
		explanation: CommonOnes.components.explanation,
	},
	elements: {
		Containers: CustoType.component,
		Text: CustoType.component,
		BodyContainer: CustoType.component,
		statement: {
			Container: CustoType.component,
			Text: CustoType.component,
		},
		choices: {
			Container: CustoType.component,
			single: {
				Container: CustoType.component,
				DecorationContainer: CustoType.component,
				Icon: CustoType.component,
				Text: CustoType.component,
				TextContainer: CustoType.component,
			},
		},
		explanation: CommonOnes.elements.explanation,
	},
	texts: {
		explanation: CommonOnes.texts.explanation,
	},
};

export const MC = CreateCusto.Tree<MCPassable>(
	MCOnes as any,
	useNormalizedQuestionContextSelector,
	{
		prefixes: [ContentType.MultipleChoice],
		getTextTransformationHook,
	}
);

export const MCComps = MC.components;

export const MCElements = MC.elements;

export const MCTexts = MC.texts;
