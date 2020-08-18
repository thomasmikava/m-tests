import {
	GeneralCustoComp,
	GeneralCustoHTMLElement,
	GeneralCustoText,
} from "custo/lib/utils/prop-generics";
import { MCEditBodyProps } from "../components/types";

export interface MCEditPassableComponents {
	body: GeneralCustoComp<MCEditBodyProps>;
}

export interface MCEditPassableElements {
	container?: GeneralCustoHTMLElement;
	text?: GeneralCustoHTMLElement;
	statement: {
		container?: GeneralCustoHTMLElement;
		text?: GeneralCustoHTMLElement;
	};
	choices: {
		container?: GeneralCustoHTMLElement;
		single: {
			container?: GeneralCustoComp<{ choiceId: number }>;
			decorationContainer?: GeneralCustoComp<{ choiceId: number }>;
			textContainer?: GeneralCustoComp<{ choiceId: number }>;
			text?: GeneralCustoHTMLElement;
		};
	};
	explanation: {
		container?: GeneralCustoHTMLElement;
		title?: GeneralCustoHTMLElement;
		body?: GeneralCustoHTMLElement;
		text?: GeneralCustoHTMLElement;
	};
}

export interface MCEditPassableTexts {
	explanation?: {
		title?: GeneralCustoText;
	};
}

export interface MCEditPassable {
	components: MCEditPassableComponents;
	elements: MCEditPassableElements;
	texts: MCEditPassableTexts;
}
