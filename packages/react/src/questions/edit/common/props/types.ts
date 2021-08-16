import {
	ContentType,
	EmptyContentCreationSettings,
	IStatement,
	StrictEmptyContentCreationSettings
} from "m-tests-core/lib/questions/common-schemas";
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import { CustoDeff } from "../../../../elements";
import {
	CheckboxWithLabelProps, ExplanationProps, SelectProps
} from "../../../view/common/components/types";
import { EditTextComponentProps, IChooseQuestionContentTypeProps } from "../components/types";

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


export interface ContentTypeChooseOption {
	value: EmptyContentCreationSettings;
	label: RichText;
}

interface CommonEditTexts {
	explanation: {
		Title: CustoDeff.Text;
		Placeholder: CustoDeff.Data<string>;
	};
	contentTypes: {
		Placeholder: CustoDeff.Data<string>;
		options: CustoDeff.Data<ContentTypeChooseOption[]>;
	};
}

export type RawStatToEditableStatFn = <T extends IStatement | undefined | null>(
	stat: T
) => any;

export type EditableStatToRawStatFn = (stat: any) => IStatement;
export type GetChangedContentFn = (settings: {
	oldContent?: IRawQuestionContent;
	newContentSettings: EmptyContentCreationSettings;
}) => IRawQuestionContent | undefined;

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
	getChangedContentFn?: CustoDeff.Data<GetChangedContentFn>;
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


export type StrictEmptyContentOptionValue = {
	[key in keyof StrictEmptyContentCreationSettings & ContentType]: StrictEmptyContentCreationSettings[key] & { contentType: key };
}
