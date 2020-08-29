import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { CreateCusto, CustoType } from "custo";
import { ToCustoTreeObj } from "custo/lib/classes/helper-fns/tree";
import { useNormalizedQuestionEditContextSubscriber } from "../../customizations/providers";
import { MCEditPassable } from "../props/types";

const MCEditOnes: ToCustoTreeObj<MCEditPassable> = {
	components: {
		head: CustoType.component,
		body: CustoType.component,
		tail: CustoType.component,
		statement: {
			container: CustoType.component,
			text: CustoType.component,
		},
		choices: {
			container: CustoType.component,
			single: {
				container: CustoType.component,
				text: CustoType.component,
				decoration: CustoType.component,
				rightDecoration: CustoType.component,
			},
			addChoice: CustoType.component,
		},
		explanation: {
			container: CustoType.component,
			text: CustoType.component,
		},
	},
	texts: {
		explanation: {
			title: CustoType.text,
			placeholder: CustoType.data,
		},
		statement: {
			placeholder: CustoType.data,
		},
		choices: {
			addChoice: CustoType.text,
			single: {
				placeholder: CustoType.data,
			}
		},
		canSelectMultiple: CustoType.text,
		disableShuffle: CustoType.text,
		allowPartialCredit: CustoType.text,
	},
	elements: {
		container: CustoType.component,
		headContainer: CustoType.component,
		bodyContainer: CustoType.component,
		tailContainer: CustoType.component,
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
				icon: CustoType.component,
				rightDecorationContainer: CustoType.component,
				rightIcon: CustoType.component,
				textContainer: CustoType.component,
				text: CustoType.component,
			},
			button: CustoType.component,
		},
		explanation: {
			container: CustoType.component,
			title: CustoType.component,
			body: CustoType.component,
			text: CustoType.component,
		},
		containers: CustoType.component,
	},
};

export const MCEdit = CreateCusto.Tree<MCEditPassable>(
	MCEditOnes as any,
	useNormalizedQuestionEditContextSubscriber,
	{ prefixes: [ContentType.MultipleChoice] }
);

export const MCEditTexts = MCEdit.texts;
export const MCEditComps = MCEdit.components;
