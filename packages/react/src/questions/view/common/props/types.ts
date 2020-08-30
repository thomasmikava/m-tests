import {
	GeneralCustoComp,
	GeneralCustoHTMLElement,
	GeneralCustoText,
	GeneralCustoHook,
} from "custo/lib/utils/prop-generics";
import { ExplanationProps, TextComponentProps } from "../components/types";

interface CommonComponents {
	Text: GeneralCustoComp<TextComponentProps>;
	explanation: {
		Container: GeneralCustoComp<ExplanationProps>;
		Text?: GeneralCustoComp<TextComponentProps>;
	};
}

interface CommonElements {
	OuterContainer: GeneralCustoHTMLElement;
	BodyContainer: GeneralCustoHTMLElement;
	Text: GeneralCustoHTMLElement;
	InnerContainers?: GeneralCustoHTMLElement;
	explanation: {
		Container?: GeneralCustoHTMLElement;
		Title: GeneralCustoHTMLElement;
		Body: GeneralCustoHTMLElement;
		Text?: GeneralCustoHTMLElement;
	};
}

interface CommonTexts {
	explanation: {
		Title: GeneralCustoText;
	};
}
interface CommonFunctions {}
interface CommonHooks {
	contentTextTransformer?: GeneralCustoHook<
		(text: string) => string | JSX.Element | null
	>;
	nonContentTextTransformer?: GeneralCustoHook<
		(
			text: string | number | JSX.Element | null
		) => string | number | JSX.Element | null
	>;
}

export interface CommonPassable {
	components: CommonComponents;
	elements: CommonElements;
	texts: CommonTexts;
	functions: CommonFunctions;
	hooks: CommonHooks;
}
