import { TextComponentProps } from "../../common/components/types";
import {
	MCBodyProps,
	MCStatementProps,
	MCChoicesProps,
	MCSingleChoiceProps,
	MCSingleChoiceDecorationProps,
} from "../components/types";
import { CommonPassable } from "../../common/props/types";
import { DeeplyOptional } from "custo/lib/utils/generics";
import { CustoDeff } from "../../../../elements";

type CommonTexts = CommonPassable["texts"];
type CommonElements = CommonPassable["elements"];
type CommonComponents = CommonPassable["components"];

interface MCPassableComponents {
	Body: CustoDeff.Component<MCBodyProps>;
	statement: {
		Container: CustoDeff.Component<MCStatementProps>;
		Text?: CustoDeff.Component<TextComponentProps>;
	};
	choices: {
		Container: CustoDeff.Component<MCChoicesProps>;
		single: {
			Container: CustoDeff.Component<MCSingleChoiceProps>;
			Text?: CustoDeff.Component<TextComponentProps>;
			Decoration?: CustoDeff.Component<MCSingleChoiceDecorationProps>;
		};
	};
	explanation: DeeplyOptional<CommonComponents["explanation"]>;
}

interface MCPassableElements {
	Containers?: CustoDeff.HTMLElement;
	BodyContainer?: CustoDeff.HTMLElement;
	Text?: CustoDeff.HTMLElement;
	statement: {
		Container?: CustoDeff.HTMLElement;
		Text?: CustoDeff.HTMLElement;
	};
	choices: {
		Container?: CustoDeff.HTMLElement;
		single: {
			Container?: CustoDeff.HTMLElement;
			DecorationContainer?: CustoDeff.HTMLElement;
			Icon?: CustoDeff.HTMLElement;
			TextContainer?: CustoDeff.HTMLElement;
			Text?: CustoDeff.HTMLElement;
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
