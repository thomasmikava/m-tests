import {
	GeneralCustoComp,
	GeneralCustoHTMLElement,
	GeneralCustoText,
	GeneralCustData,
} from "custo/lib/utils/prop-generics";
import { MCEditBodyProps, MCEditStatementProps, MCEditChoicesProps, MCEditSingleChoiceProps, MCEditSingleChoiceDecorationProps, MCEditAddChoiceButtonProps, MCEditHeadProps, MCEditTailProps } from "../components/types";
import { ExplanationProps } from "../../../view/common/components/types";
import { EditTextComponentProps } from "../../common/components/types";
import { DeeplyOptional } from "custo/lib/utils/generics";
import { CommonEditPassable } from "../../common/props/types";

type CommonEditTexts = CommonEditPassable["texts"];

interface MCEditPassableComponents {
	head: GeneralCustoComp<MCEditHeadProps>;
	body: GeneralCustoComp<MCEditBodyProps>;
	tail: GeneralCustoComp<MCEditTailProps>;
	statement: {
		container: GeneralCustoComp<MCEditStatementProps>;
		text?: GeneralCustoComp<EditTextComponentProps>;
	};
	choices: {
		container: GeneralCustoComp<MCEditChoicesProps>;
		single: {
			container: GeneralCustoComp<MCEditSingleChoiceProps>;
			text?: GeneralCustoComp<EditTextComponentProps>;
			decoration: GeneralCustoComp<MCEditSingleChoiceDecorationProps>;
			rightDecoration: GeneralCustoComp<MCEditSingleChoiceDecorationProps>;
		};
		addChoice: GeneralCustoComp<MCEditAddChoiceButtonProps>;
	};
	explanation?: {
		container?: GeneralCustoComp<ExplanationProps>;
		text?: GeneralCustoComp<EditTextComponentProps>;
	};
}

interface MCEditPassableElements {
	container?: GeneralCustoHTMLElement;
	headContainer?: GeneralCustoHTMLElement;
	bodyContainer?: GeneralCustoHTMLElement;
	tailContainer?: GeneralCustoHTMLElement;
	containers?: GeneralCustoHTMLElement;
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
			icon: GeneralCustoHTMLElement;
			rightDecorationContainer?: GeneralCustoHTMLElement;
			rightIcon: GeneralCustoHTMLElement;
			textContainer?: GeneralCustoHTMLElement;
			text?: GeneralCustoHTMLElement;
		};
		button: GeneralCustoHTMLElement;
	};
	explanation: {
		container?: GeneralCustoHTMLElement;
		title?: GeneralCustoHTMLElement;
		body?: GeneralCustoHTMLElement;
		text?: GeneralCustoHTMLElement;
	};
}

interface MCEditPassableTexts {
	explanation?: DeeplyOptional<CommonEditTexts["explanation"]>;
	statement: {
		placeholder: GeneralCustData<string>;
	}
	choices: {
		addChoice: GeneralCustoText;
		single: {
			placeholder: GeneralCustData<string>;
		}
	};
	canSelectMultiple: GeneralCustoText;
	allowPartialCredit: GeneralCustoText;
	disableShuffle: GeneralCustoText;
}

export interface MCEditPassable {
	components: MCEditPassableComponents;
	elements: MCEditPassableElements;
	texts: MCEditPassableTexts;
}
