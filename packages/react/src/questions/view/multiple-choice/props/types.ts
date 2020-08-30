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
import { CommonPassable } from "../../common/props/types";
import { DeeplyOptional } from "custo/lib/utils/generics";

type CommonTexts = CommonPassable["texts"];
type CommonElements = CommonPassable["elements"];
type CommonComponents = CommonPassable["components"];

interface MCPassableComponents {
	Body: GeneralCustoComp<MCBodyProps>;
	statement: {
		Container: GeneralCustoComp<MCStatementProps>;
		Text?: GeneralCustoComp<TextComponentProps>;
	};
	choices: {
		Container: GeneralCustoComp<MCChoicesProps>;
		single: {
			Container: GeneralCustoComp<MCSingleChoiceProps>;
			Text?: GeneralCustoComp<TextComponentProps>;
			Decoration?: GeneralCustoComp<MCSingleChoiceDecorationProps>;
		};
	};
	explanation: DeeplyOptional<CommonComponents["explanation"]>;
}

interface MCPassableElements {
	Containers?: GeneralCustoHTMLElement;
	BodyContainer?: GeneralCustoHTMLElement;
	Text?: GeneralCustoHTMLElement;
	statement: {
		Container?: GeneralCustoHTMLElement;
		Text?: GeneralCustoHTMLElement;
	};
	choices: {
		Container?: GeneralCustoHTMLElement;
		single: {
			Container?: GeneralCustoHTMLElement;
			DecorationContainer?: GeneralCustoHTMLElement;
			Icon?: GeneralCustoHTMLElement;
			TextContainer?: GeneralCustoHTMLElement;
			Text?: GeneralCustoHTMLElement;
		};
	};
	explanation: DeeplyOptional<CommonElements["explanation"]>;
}

interface MCPassableTexts {
	explanation: DeeplyOptional<CommonTexts["explanation"]>;
}

export interface MCPassable {
	components: MCPassableComponents;
	elements: MCPassableElements;
	texts: MCPassableTexts;
}
