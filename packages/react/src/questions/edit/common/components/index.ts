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
		contentSelector: CustoType.component,
		checkboxWithLabel: CustoType.component,
	},
	elements: {
		outerContainer: CustoType.component,
		bodyContainer: CustoType.component,
		explanation: {
			container: CustoType.component,
			text: CustoType.component,
		},
		innerContainers: CustoType.component,
		text: CustoType.component,
	},
	texts: {
		explanation: {
			title: CustoType.text,
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
	{ prefixes: ["common"], }
);
