import { CustoHook } from "custo/lib/classes/hook";
import {
	EmptyContentCreationSettings, IStatement
} from "m-tests-core/lib/questions/common-schemas";
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import { SetState } from "../../../../utils/interfaces";
import { IContentGeneralProps } from "../../../view/interfaces";

export interface IChooseQuestionContentTypeRef {
    getSettings: () => EmptyContentCreationSettings | undefined;
    setSettings: (settings: EmptyContentCreationSettings) => void;
}

export interface IChooseQuestionContentTypeProps {
	defaultSettings: EmptyContentCreationSettings | undefined;
	setContent: SetState<IRawQuestionContent | undefined>;
	ref: React.Ref<IChooseQuestionContentTypeRef>;
}

export type EditExplanationProps = IContentGeneralProps;

export type EditTextComponentProps = IContentGeneralProps & {
	stat: IStatement;
	onChange: SetState<IStatement>;
	usePlaceholder?: CustoHook<() => any>;
};
