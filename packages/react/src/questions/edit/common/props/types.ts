import {
	GeneralCustoComp,
	GeneralCustoHTMLElement,
	GeneralCustoText,
	GeneralCustData,
	GeneralCustoHook,
} from "custo/lib/utils/prop-generics";
import {
	ExplanationProps,
	CheckboxWithLabelProps,
	SelectProps,
} from "../../../view/common/components/types";
import {
	ContentType,
	IStatement,
} from "m-tests-core/lib/questions/common-schemas";
import { IChooseQuestionContentTypeProps } from "../components/types";
import { EditTextComponentProps } from "../components/types";
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";

interface CommonEditComponents {
	Text: GeneralCustoComp<EditTextComponentProps>;
	ContentSelector: GeneralCustoComp<IChooseQuestionContentTypeProps>;
	CheckboxWithLabel: GeneralCustoComp<CheckboxWithLabelProps>;
	Select: GeneralCustoComp<SelectProps>;
	explanation: {
		Container: GeneralCustoComp<ExplanationProps>;
		Text?: GeneralCustoComp<EditTextComponentProps>;
	};
}

interface CommonEditElements {
	OuterContainer: GeneralCustoHTMLElement;
	BodyContainer: GeneralCustoHTMLElement;
	Text: GeneralCustoHTMLElement;
	InnerContainers?: GeneralCustoHTMLElement;
	ContentSelectorContainer: GeneralCustoHTMLElement;
	explanation: {
		Container?: GeneralCustoHTMLElement;
		Title?: GeneralCustoHTMLElement;
		Body?: GeneralCustoHTMLElement;
		Text?: GeneralCustoHTMLElement;
	};
}
type RichText = string | JSX.Element;

export interface ContentTypeChooseValue {
	contentType: ContentType;
	designStructure: string | null;
}

interface CommonEditTexts {
	explanation: {
		Title: GeneralCustoText;
		Placeholder: GeneralCustData<string>;
	};
	contentTypes: {
		Placeholder: GeneralCustData<string>;
		options: GeneralCustData<
			{
				value: ContentTypeChooseValue;
				label: RichText;
			}[]
		>;
	};
}

export type RawStatToEditableStatFn = <T extends IStatement | undefined | null>(
	stat: T
) => any;

export type EditableStatToRawStatFn = (stat: any) => IStatement;

export type RawContentToEditableContentFn = (
	content: IRawQuestionContent,
	helpers: { rawStatToEditableStatFn: RawStatToEditableStatFn }
) => IRawQuestionContent;

export type EditableContentToRawContentFn = (
	content: IRawQuestionContent,
	helpers: { editableStatToRawStatFn: EditableStatToRawStatFn }
) => IRawQuestionContent;

interface CommonEditFunctions {
	getEmptyText: GeneralCustData<() => any>;
	rawContentToEditableContentFn?: GeneralCustData<
		RawContentToEditableContentFn
	>;
	editableContentToRawContentFn?: GeneralCustData<
		EditableContentToRawContentFn
	>;
	rawStatToEditableStatFn?: GeneralCustData<RawStatToEditableStatFn>;
	editableStatToRawStatFn?: GeneralCustData<EditableStatToRawStatFn>;
}

interface CommonEditHooks {
	contentTextTransformer?: GeneralCustoHook<
		(text: string) => string | JSX.Element | null
	>;
	nonContentTextTransformer?: GeneralCustoHook<
		(
			text: string | number | JSX.Element | null
		) => string | number | JSX.Element | null
	>;
}

export interface CommonEditPassable {
	components: CommonEditComponents;
	elements: CommonEditElements;
	texts: CommonEditTexts;
	functions: CommonEditFunctions;
	hooks: CommonEditHooks;
}
