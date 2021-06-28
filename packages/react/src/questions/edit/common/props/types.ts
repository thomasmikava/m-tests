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
import { CustoDeff } from "../../../../elements";

interface CommonEditComponents {
	Text: CustoDeff.Component<EditTextComponentProps>;
	ContentSelector: CustoDeff.Component<IChooseQuestionContentTypeProps>;
	CheckboxWithLabel: CustoDeff.Component<CheckboxWithLabelProps>;
	Select: CustoDeff.Component<SelectProps>;
	explanation: {
		Container: CustoDeff.Component<ExplanationProps>;
		Text?: CustoDeff.Component<EditTextComponentProps>;
	};
}

interface CommonEditElements {
	OuterContainer: CustoDeff.HTMLElement;
	BodyContainer: CustoDeff.HTMLElement;
	Text: CustoDeff.HTMLElement;
	InnerContainers?: CustoDeff.HTMLElement;
	ContentSelectorContainer: CustoDeff.HTMLElement;
	explanation: {
		Container?: CustoDeff.HTMLElement;
		Title?: CustoDeff.HTMLElement;
		Body?: CustoDeff.HTMLElement;
		Text?: CustoDeff.HTMLElement;
	};
}
type RichText = string | JSX.Element;

export interface ContentTypeChooseValue {
	contentType: ContentType;
	designStructure: string | null;
}

interface CommonEditTexts {
	explanation: {
		Title: CustoDeff.Text;
		Placeholder: CustoDeff.Data<string>;
	};
	contentTypes: {
		Placeholder: CustoDeff.Data<string>;
		options: CustoDeff.Data<
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
	getEmptyText: CustoDeff.Data<() => string>;
	rawContentToEditableContentFn?: CustoDeff.Data<
		RawContentToEditableContentFn
	>;
	editableContentToRawContentFn?: CustoDeff.Data<
		EditableContentToRawContentFn
	>;
	rawStatToEditableStatFn?: CustoDeff.Data<RawStatToEditableStatFn>;
	editableStatToRawStatFn?: CustoDeff.Data<EditableStatToRawStatFn>;
}

interface CommonEditHooks {
	contentTextTransformer?: CustoDeff.Hook<
		(text: string) => string | JSX.Element | null
	>;
	nonContentTextTransformer?: CustoDeff.Hook<
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
