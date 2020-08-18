import {
	GeneralCustoComp,
	GeneralCustoHTMLElement,
	GeneralCustoText,
	GeneralCustData,
	GeneralCustoHook,
} from "custo/lib/utils/prop-generics";
import {
	TextComponentProps,
	ExplanationProps,
} from "../../../view/common/components/types";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { IChooseQuestionContentTypeProps } from "../components/providers";

export interface CommonEditComponents {
	text: GeneralCustoComp<TextComponentProps>;
	explanation: {
		container: GeneralCustoComp<ExplanationProps>;
		text?: GeneralCustoComp<TextComponentProps>;
	};
	contentSelector: GeneralCustoComp<IChooseQuestionContentTypeProps>;
}

export interface CommonEditElements {
	outerContainer: GeneralCustoHTMLElement;
}

export interface CommonEditFunctions {
	useContentTextTransformer: GeneralCustoHook<
		(text: string) => string | JSX.Element | null
	>;
	useNonContentTextTransformer?: GeneralCustoHook<
		(
			text: string | number | JSX.Element | null
		) => string | number | JSX.Element | null
	>;
}

type RichText = string | JSX.Element;

export interface ContentTypeChooseValue {
	contentType: ContentType;
	designStructure: string | null;
}

export interface CommonEditTexts {
	explanation: {
		title: GeneralCustoText;
	};
	contentTypes: GeneralCustData<
		{
			value: ContentTypeChooseValue;
			label: RichText;
		}[]
	>;
}

export interface CommonEditPassable {
	components: CommonEditComponents;
	elements: CommonEditElements;
	functions: CommonEditFunctions;
	texts: CommonEditTexts;
}
