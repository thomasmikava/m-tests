import {
	GeneralCustoComp,
	GeneralCustoHTMLElement,
	GeneralCustoText,
	GeneralCustoHook,
} from "custo/lib/utils/prop-generics";
import { ExplanationProps, TextComponentProps } from "../components/types";

interface CommonComponents {
	text: GeneralCustoComp<TextComponentProps>;
	explanation: {
		container: GeneralCustoComp<ExplanationProps>;
		text?: GeneralCustoComp<TextComponentProps>;
	};
}

interface CommonElements {
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


interface CommonTexts {
	explanation: {
		title: GeneralCustoText;
	};
}
interface CommonFunctions {
}
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
