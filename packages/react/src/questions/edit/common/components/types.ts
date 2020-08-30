import { IContentGeneralProps } from "../../../view/interfaces";
import {
	IStatement,
	ContentType,
} from "m-tests-core/lib/questions/common-schemas";
import { SetState } from "../../../../utils/interfaces";
import { CustoHook } from "custo/lib/classes/hook";
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";

export interface IChooseQuestionContentTypeProps {
	selectedType: ContentType | null;
	selectedDesignStructure: string | null;
	setContent: SetState<IRawQuestionContent | undefined>;
}

export type EditExplanationProps = IContentGeneralProps;

export type EditTextComponentProps = IContentGeneralProps & {
	stat: IStatement;
	onChange: SetState<IStatement>;
	usePlaceholder?: CustoHook<() => any>;
};
