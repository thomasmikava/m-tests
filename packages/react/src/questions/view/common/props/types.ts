import {
	GeneralCustoComp,
	GeneralCustoHTMLElement,
	GeneralCustoText,
	GeneralCustoHook,
} from "custo/lib/utils/prop-generics";
import { ExplanationProps, TextComponentProps } from "../components/types";

export interface CommonComponents {
	text: GeneralCustoComp<TextComponentProps>;
	explanation: {
		container: GeneralCustoComp<ExplanationProps>;
		text?: GeneralCustoComp<TextComponentProps>;
	};
}

export interface CommonElements {
	outerContainer: GeneralCustoHTMLElement;
	bodyContainer: GeneralCustoHTMLElement;
	text: GeneralCustoHTMLElement;
	innerContainers?: GeneralCustoHTMLElement;
	explanation: {
		container?: GeneralCustoHTMLElement;
		title: GeneralCustoHTMLElement;
		body: GeneralCustoHTMLElement;
		text?: GeneralCustoHTMLElement;
	};
}

export interface CommonFunctions {
	useContentTextTransformer: GeneralCustoHook<
		(text: string) => string | JSX.Element | null
	>;
	useNonContentTextTransformer?: GeneralCustoHook<
		(
			text: string | number | JSX.Element | null
		) => string | number | JSX.Element | null
	>;
}

export interface CommonTexts {
	explanation: {
		title: GeneralCustoText;
	};
}

export interface CommonPassable {
	components: CommonComponents;
	elements: CommonElements;
	texts: CommonTexts;
	functions: CommonFunctions;
}
