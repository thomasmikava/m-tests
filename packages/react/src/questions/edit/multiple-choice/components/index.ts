import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { CreateCusto, CustoType } from "custo";
import { ToCustoTreeObj } from "custo/lib/classes/helper-fns/tree";
import { useNormalizedQuestionEditContextSubscriber } from "../../customizations/providers";
import { MCEditPassable } from "../props/types";
import { CommonEditOnes } from "../../common/components";

const MCEditOnes: ToCustoTreeObj<MCEditPassable> = {
	components: {
		Head: CustoType.component,
		Body: CustoType.component,
		Tail: CustoType.component,
		statement: {
			Container: CustoType.component,
			Text: CustoType.component,
		},
		choices: {
			Container: CustoType.component,
			single: {
				Container: CustoType.component,
				Text: CustoType.component,
				LeftDecoration: CustoType.component,
				RightDecoration: CustoType.component,
			},
			AddChoice: CustoType.component,
		},
		explanation: CommonEditOnes.components.explanation,
	},
	texts: {
		explanation: CommonEditOnes.texts.explanation,
		statement: {
			placeholder: CustoType.data,
		},
		choices: {
			AddChoice: CustoType.text,
			single: {
				placeholder: CustoType.data,
			}
		},
		CanSelectMultiple: CustoType.text,
		DisableShuffle: CustoType.text,
		AllowPartialCredit: CustoType.text,
	},
	elements: {
		Container: CustoType.component,
		HeadContainer: CustoType.component,
		BodyContainer: CustoType.component,
		TailContainer: CustoType.component,
		Text: CustoType.component,
		statement: {
			Container: CustoType.component,
			Text: CustoType.component,
		},
		choices: {
			Container: CustoType.component,
			single: {
				Container: CustoType.component,
				left: {
					DecorationContainer: CustoType.component,
					Icon: CustoType.component,
				},
				right: {
					DecorationContainer: CustoType.component,
					Icon: CustoType.component,
				},
				TextContainer: CustoType.component,
				Text: CustoType.component,
			},
			Button: CustoType.component,
		},
		explanation: CommonEditOnes.elements.explanation,
		Containers: CustoType.component,
	},
};

export const MCEdit = CreateCusto.Tree<MCEditPassable>(
	MCEditOnes as any,
	useNormalizedQuestionEditContextSubscriber,
	{ prefixes: [ContentType.MultipleChoice], defaultValuesByTypes: { [CustoType.component]: CreateCusto.Component("div") } }
);

export const MCEditTexts = MCEdit.texts;
export const MCEditComps = MCEdit.components;
