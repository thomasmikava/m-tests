import {
	GeneralCustoComp,
	GeneralCustoHTMLElement,
	GeneralCustoText,
	GeneralCustData,
	GeneralCustoHook,
} from "custo/lib/utils/prop-generics";
import {
	ExplanationProps, CheckboxWithLabelProps,
} from "../../../view/common/components/types";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { IChooseQuestionContentTypeProps } from "../components/types";
import { EditTextComponentProps } from "../components/types";

interface CommonEditComponents {
	text: GeneralCustoComp<EditTextComponentProps>;
	explanation: {
		container: GeneralCustoComp<ExplanationProps>;
		text?: GeneralCustoComp<EditTextComponentProps>;
	};
	contentSelector: GeneralCustoComp<IChooseQuestionContentTypeProps>;
	checkboxWithLabel: GeneralCustoComp<CheckboxWithLabelProps>;
}

interface CommonEditElements {
	outerContainer: GeneralCustoHTMLElement;
	bodyContainer: GeneralCustoHTMLElement;
	text: GeneralCustoHTMLElement;
	innerContainers?: GeneralCustoHTMLElement;
	explanation: {
		container?: GeneralCustoHTMLElement;
		text?: GeneralCustoHTMLElement;
	};
}
type RichText = string | JSX.Element;

export interface ContentTypeChooseValue {
	contentType: ContentType;
	designStructure: string | null;
}

interface CommonEditTexts {
	explanation: {
		title: GeneralCustoText;
		placeholder: GeneralCustData<string>;
	};
	contentTypes: GeneralCustData<
		{
			value: ContentTypeChooseValue;
			label: RichText;
		}[]
	>;
}

interface CommonEditFunctions {
	getEmptyText: GeneralCustData<() => any>;
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
