import { ContentType } from "@tests-core/schemas/questions/contnets/common-schemas";
import { CreateCusto, CustoType } from "custo";
import { ToCustoTreeObj } from "custo/lib/classes/helper-fns/tree";
import { useNormalizedQuestionContextSelector } from "../../customizations/providers";
import { MCPassable } from "../props/types";
import { getTextTransformationHook } from "../../common/components";

const MCOnes: ToCustoTreeObj<MCPassable> = {
	components: {
		body: CustoType.component,
		statement: {
			container: CustoType.component,
			text: CustoType.component,
		},
		choices: {
			container: CustoType.component,
			single: {
				container: CustoType.component,
				decoration: CustoType.component,
				text: CustoType.component,
			},
		},
		explanation: {
			container: CustoType.component,
			text: CustoType.component,
		},
	},
	elements: {
		containers: CustoType.component,
		text: CustoType.component,
		bodyContainer: CustoType.component,
		statement: {
			container: CustoType.component,
			text: CustoType.component,
		},
		choices: {
			container: CustoType.component,
			single: {
				container: CustoType.component,
				decorationContainer: CustoType.component,
				text: CustoType.component,
				textContainer: CustoType.component,
			},
		},
		explanation: {
			container: CustoType.component,
			text: CustoType.component,
			title: CustoType.component,
			body: CustoType.component,
		},
	},
	texts: {
		explanation: {
			title: CustoType.text,
		},
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
