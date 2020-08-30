import {
	GeneralCustoComp,
	GeneralCustoHTMLElement,
	GeneralCustoText,
	GeneralCustData,
} from "custo/lib/utils/prop-generics";
import { MCEditBodyProps, MCEditStatementProps, MCEditChoicesProps, MCEditSingleChoiceProps, MCEditSingleChoiceDecorationProps, MCEditAddChoiceButtonProps, MCEditHeadProps, MCEditTailProps } from "../components/types";
import { EditTextComponentProps } from "../../common/components/types";
import { DeeplyOptional } from "custo/lib/utils/generics";
import { CommonEditPassable } from "../../common/props/types";

type CommonEditTexts = CommonEditPassable["texts"];
type CommonEditElements = CommonEditPassable["elements"];
type CommonEditComponents = CommonEditPassable["components"];

interface MCEditPassableComponents {
	Head: GeneralCustoComp<MCEditHeadProps>;
	Body: GeneralCustoComp<MCEditBodyProps>;
	Tail: GeneralCustoComp<MCEditTailProps>;
	statement: {
		Container: GeneralCustoComp<MCEditStatementProps>;
		Text?: GeneralCustoComp<EditTextComponentProps>;
	};
	choices: {
		Container: GeneralCustoComp<MCEditChoicesProps>;
		single: {
			Container: GeneralCustoComp<MCEditSingleChoiceProps>;
			Text?: GeneralCustoComp<EditTextComponentProps>;
			LeftDecoration: GeneralCustoComp<MCEditSingleChoiceDecorationProps>;
			RightDecoration: GeneralCustoComp<MCEditSingleChoiceDecorationProps>;
		};
		AddChoice: GeneralCustoComp<MCEditAddChoiceButtonProps>;
	};
	explanation?: DeeplyOptional<CommonEditComponents["explanation"]>;
}

interface MCEditPassableElements {
	Container?: GeneralCustoHTMLElement;
	HeadContainer?: GeneralCustoHTMLElement;
	BodyContainer?: GeneralCustoHTMLElement;
	TailContainer?: GeneralCustoHTMLElement;
	Containers?: GeneralCustoHTMLElement;
	Text?: GeneralCustoHTMLElement;
	statement: {
		Container?: GeneralCustoHTMLElement;
		Text?: GeneralCustoHTMLElement;
	};
	choices: {
		Container?: GeneralCustoHTMLElement;
		single: {
			Container?: GeneralCustoHTMLElement;
			left: {
				DecorationContainer?: GeneralCustoHTMLElement;
				Icon: GeneralCustoHTMLElement;
			};
			right: {
				DecorationContainer?: GeneralCustoHTMLElement;
				Icon: GeneralCustoHTMLElement;
			}
			TextContainer?: GeneralCustoHTMLElement;
			Text?: GeneralCustoHTMLElement;
		};
		Button: GeneralCustoHTMLElement;
	};
	explanation: DeeplyOptional<CommonEditElements["explanation"]>;
}

interface MCEditPassableTexts {
	explanation?: DeeplyOptional<CommonEditTexts["explanation"]>;
	statement: {
		placeholder: GeneralCustData<string>;
	}
	choices: {
		AddChoice: GeneralCustoText;
		single: {
			placeholder: GeneralCustData<string>;
		}
	};
	CanSelectMultiple: GeneralCustoText;
	AllowPartialCredit: GeneralCustoText;
	DisableShuffle: GeneralCustoText;
}

export interface MCEditPassable {
	components: MCEditPassableComponents;
	elements: MCEditPassableElements;
	texts: MCEditPassableTexts;
}
