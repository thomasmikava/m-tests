import {
	GeneralCustoText,
	GeneralCustoComp,
	GeneralCustoHTMLElement,
} from "custo/lib/utils/prop-generics";
import {
	ExplanationProps,
	TextComponentProps,
} from "../../common/components/types";
import {
	MCBodyProps,
	MCStatementProps,
	MCChoicesProps,
	MCSingleChoiceProps,
	MCSingleChoiceDecorationProps,
} from "../components/types";

export interface MCPassableComponents {
	body: GeneralCustoComp<MCBodyProps>;
	statement: {
		container: GeneralCustoComp<MCStatementProps>;
		text?: GeneralCustoComp<TextComponentProps>;
	};
	choices: {
		container: GeneralCustoComp<MCChoicesProps>;
		single: {
			container: GeneralCustoComp<MCSingleChoiceProps>;
			text?: GeneralCustoComp<TextComponentProps>;
			decoration?: GeneralCustoComp<MCSingleChoiceDecorationProps>;
		};
	};
	explanation?: {
		container?: GeneralCustoComp<ExplanationProps>;
		text?: GeneralCustoComp<TextComponentProps>;
	};
}

export interface MCPassableElements {
	containers?: GeneralCustoHTMLElement;
	bodyContainer?: GeneralCustoHTMLElement;
	text?: GeneralCustoHTMLElement;
	statement: {
		container?: GeneralCustoHTMLElement;
		text?: GeneralCustoHTMLElement;
	};
	choices: {
		container?: GeneralCustoHTMLElement;
		single: {
			container?: GeneralCustoHTMLElement;
			decorationContainer?: GeneralCustoHTMLElement;
			textContainer?: GeneralCustoHTMLElement;
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

export interface MCPassableTexts {
	explanation?: {
		title?: GeneralCustoText;
	};
}

export interface MCPassable {
	components: MCPassableComponents;
	elements: MCPassableElements;
	texts: MCPassableTexts;
}
