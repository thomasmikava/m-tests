import { ContentType } from "@tests-core/schemas/questions/contnets/common-schemas";
import { CreateCusto, CustoType } from "custo";
import { ToCustoTreeObj } from "custo/lib/classes/helper-fns/tree";
import { useNormalizedQuestionEditContextSubscriber } from "../../customizations/providers";
import { MCEditPassable } from "../props/types";

const MCEditOnes: ToCustoTreeObj<MCEditPassable> = {
	components: {
		body: CustoType.component,
	},
	texts: {
		explanation: {
			title: CustoType.text,
		},
	},
	elements: {
		container: CustoType.component,
		text: CustoType.component,
		statement: {
			container: CustoType.component,
			text: CustoType.component,
		},
		choices: {
			container: CustoType.component,
			single: {
				container: CustoType.component,
				decorationContainer: CustoType.component,
				textContainer: CustoType.component,
				text: CustoType.component,
			},
		},
		explanation: {
			container: CustoType.component,
			title: CustoType.component,
			body: CustoType.component,
			text: CustoType.component,
		},
	},
};

export const MCEdit = CreateCusto.Tree<MCEditPassable>(
	MCEditOnes as any,
	useNormalizedQuestionEditContextSubscriber,
	{ prefixes: [ContentType.MultipleChoice] }
);

export const MCEditTexts = MCEdit.texts;
export const MCEditComps = MCEdit.components;
