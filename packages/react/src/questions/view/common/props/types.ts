import { ExplanationProps, TextComponentProps } from "../components/types";
import { CustoDeff } from "../../../../elements";

interface CommonComponents {
	Text: CustoDeff.Component<TextComponentProps>;
	explanation: {
		Container: CustoDeff.Component<ExplanationProps>;
		Text?: CustoDeff.Component<TextComponentProps>;
	};
}

interface CommonElements {
	OuterContainer: CustoDeff.HTMLElement;
	BodyContainer: CustoDeff.HTMLElement;
	Text: CustoDeff.HTMLElement;
	InnerContainers?: CustoDeff.HTMLElement;
	explanation: {
		Container?: CustoDeff.HTMLElement;
		Title: CustoDeff.HTMLElement;
		Body: CustoDeff.HTMLElement;
		Text?: CustoDeff.HTMLElement;
	};
}

interface CommonTexts {
	explanation: {
		Title: CustoDeff.Text;
	};
}
interface CommonFunctions {}
interface CommonHooks {
	contentTextTransformer?: CustoDeff.Hook<
		(text: string) => string | JSX.Element | null
	>;
	nonContentTextTransformer?: CustoDeff.Hook<
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
