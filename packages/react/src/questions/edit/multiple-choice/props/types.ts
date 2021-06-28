import {
	MCEditBodyProps,
	MCEditStatementProps,
	MCEditChoicesProps,
	MCEditSingleChoiceProps,
	MCEditSingleChoiceDecorationProps,
	MCEditAddChoiceButtonProps,
	MCEditHeadProps,
	MCEditTailProps,
} from "../components/types";
import { EditTextComponentProps } from "../../common/components/types";
import { DeeplyOptional } from "custo/lib/utils/generics";
import { CommonEditPassable } from "../../common/props/types";
import {
	IMultipleChoiceContent,
} from "m-tests-core/lib/questions/multiple-choice/types";
import { CustoDeff } from "../../../../elements";

type CommonEditTexts = CommonEditPassable["texts"];
type CommonEditElements = CommonEditPassable["elements"];
type CommonEditComponents = CommonEditPassable["components"];

interface MCEditPassableComponents {
	Head: CustoDeff.Component<MCEditHeadProps>;
	Body: CustoDeff.Component<MCEditBodyProps>;
	Tail: CustoDeff.Component<MCEditTailProps>;
	statement: {
		Container: CustoDeff.Component<MCEditStatementProps>;
		Text?: CustoDeff.Component<EditTextComponentProps>;
	};
	choices: {
		Container: CustoDeff.Component<MCEditChoicesProps>;
		single: {
			Container: CustoDeff.Component<MCEditSingleChoiceProps>;
			Text?: CustoDeff.Component<EditTextComponentProps>;
			LeftDecoration: CustoDeff.Component<MCEditSingleChoiceDecorationProps>;
			RightDecoration: CustoDeff.Component<
				MCEditSingleChoiceDecorationProps
			>;
		};
		AddChoice: CustoDeff.Component<MCEditAddChoiceButtonProps>;
	};
	explanation?: DeeplyOptional<CommonEditComponents["explanation"]>;
}

interface MCEditPassableElements {
	Container?: CustoDeff.HTMLElement;
	HeadContainer?: CustoDeff.HTMLElement;
	BodyContainer?: CustoDeff.HTMLElement;
	TailContainer?: CustoDeff.HTMLElement;
	Containers?: CustoDeff.HTMLElement;
	Text?: CustoDeff.HTMLElement;
	statement: {
		Container?: CustoDeff.HTMLElement;
		Text?: CustoDeff.HTMLElement;
	};
	choices: {
		Container?: CustoDeff.HTMLElement;
		single: {
			Container?: CustoDeff.HTMLElement;
			left: {
				DecorationContainer?: CustoDeff.HTMLElement;
				Icon: CustoDeff.HTMLElement;
			};
			right: {
				DecorationContainer?: CustoDeff.HTMLElement;
				Icon: CustoDeff.HTMLElement;
			};
			TextContainer?: CustoDeff.HTMLElement;
			Text?: CustoDeff.HTMLElement;
		};
		Button: CustoDeff.HTMLElement;
	};
	explanation: DeeplyOptional<CommonEditElements["explanation"]>;
}

interface MCEditPassableTexts {
	explanation?: DeeplyOptional<CommonEditTexts["explanation"]>;
	statement: {
		Placeholder: CustoDeff.Data<string>;
	};
	choices: {
		AddChoice: CustoDeff.Text;
		single: {
			Placeholder: CustoDeff.Data<string>;
		};
	};
	CanSelectMultiple: CustoDeff.Text;
	AllowPartialCredit: CustoDeff.Text;
	DisableShuffle: CustoDeff.Text;
}

interface MCEditPassableHooks {
	choices?: {
		isCurrentChoiceCorrect?: CustoDeff.Hook<() => boolean>;
		chooseFn?: CustoDeff.Hook<(choiceId: number) => () => void>;
		deleteFn?: CustoDeff.Hook<(choiceId: number) => () => void>;
		addEmptyChoiceFn?: CustoDeff.Hook<() => () => void>;
	};
	settings?: {
		canSelectMultipleChangeFn?: CustoDeff.Hook<
			() => (
				canSelectMultiple: IMultipleChoiceContent["canSelectMultiple"]
			) => void
		>;
		allowPartialCreditChangeFn?: CustoDeff.Hook<
			() => (
				allowPartialCredit: IMultipleChoiceContent["allowPartialCredit"]
			) => void
		>;
		disableShuffleChangeFn?: CustoDeff.Hook<
			() => (
				disableShuffle: IMultipleChoiceContent["disableShuffle"]
			) => void
		>;
	};
}

export interface MCEditPassable {
	components: MCEditPassableComponents;
	elements: MCEditPassableElements;
	texts: MCEditPassableTexts;
	hooks: MCEditPassableHooks;
}
