import { CreateCusto, CustoType } from "custo";
import { ToCustoTreeObj } from "custo/lib/classes/helper-fns/tree";
import { useNormalizedQuestionEditContextSubscriber } from "../../customizations/providers";
import { CommonEditPassable } from "../props/types";

export const CommonEditOnes: ToCustoTreeObj<CommonEditPassable> = {
	components: {
		Text: CustoType.component,
		explanation: {
			Container: CustoType.component,
			Text: CustoType.component,
		},
		ContentSelector: CustoType.component,
		CheckboxWithLabel: CustoType.component,
	},
	elements: {
		OuterContainer: CustoType.component,
		BodyContainer: CustoType.component,
		explanation: {
			Container: CustoType.component,
			Text: CustoType.component,
			Body: CustoType.component,
			Title: CustoType.component,
		},
		InnerContainers: CustoType.component,
		Text: CustoType.component,
	},
	texts: {
		explanation: {
			Title: CustoType.text,
			placeholder: CustoType.data,
		},
		contentTypes: CustoType.data,
	},
	functions: {
		getEmptyText: CustoType.data,
	},
	hooks: {
		contentTextTransformer: CustoType.data,
		nonContentTextTransformer: CustoType.data,
	},
};

export const CommonEditCusto = CreateCusto.Tree<CommonEditPassable>(
	CommonEditOnes as any,
	useNormalizedQuestionEditContextSubscriber,
	{ prefixes: ["common"] }
);
