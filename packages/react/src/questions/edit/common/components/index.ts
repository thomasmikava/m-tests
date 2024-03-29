import { CreateCusto, CustoType } from "custo";
import { ToCustoTreeObj } from "custo/lib/classes/helper-fns/tree";
import { useNormalizedQuestionEditContextSubscriber } from "../../customizations/providers";
import { CommonEditPassable } from "../props/types";
import {
	rawContentToEditableContent,
	editableContentToRawContent,
} from "../helper-fns";
import { getChangedContent } from "../../helpers/default-content";

export const CommonEditOnes: ToCustoTreeObj<CommonEditPassable> = {
	components: {
		Text: CustoType.component,
		explanation: {
			Container: CustoType.component,
			Text: CustoType.component,
		},
		ContentSelector: CustoType.component,
		CheckboxWithLabel: CustoType.component,
		Select: CustoType.component,
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
		ContentSelectorContainer: CustoType.component,
	},
	texts: {
		explanation: {
			Title: CustoType.text,
			Placeholder: CustoType.data,
		},
		contentTypes: {
			Placeholder: CustoType.data,
			options: CustoType.data,
		},
	},
	functions: {
		getEmptyText: CustoType.data,
		rawContentToEditableContentFn: CustoType.data,
		rawStatToEditableStatFn: CustoType.data,
		editableContentToRawContentFn: CustoType.data,
		editableStatToRawStatFn: CustoType.data,
		getChangedContentFn: CustoType.data,
	},
	hooks: {
		contentTextTransformer: CustoType.data,
		nonContentTextTransformer: CustoType.data,
	},
};

export const CommonEditCusto = CreateCusto.Tree<CommonEditPassable>(
	CommonEditOnes as any,
	useNormalizedQuestionEditContextSubscriber,
	{
		prefixes: ["common"],
		defaultValue: {
			functions: {
				rawContentToEditableContentFn: CreateCusto.Data(
					rawContentToEditableContent
				),
				rawStatToEditableStatFn: CreateCusto.Data(x => x),
				editableContentToRawContentFn: CreateCusto.Data(
					editableContentToRawContent
				),
				editableStatToRawStatFn: CreateCusto.Data(x => x),
				getChangedContentFn: CreateCusto.Data(getChangedContent)
			},
		},
	}
);
