import { IContentGeneralProps } from "../../../view/interfaces";

export interface MultipleChoiceEditContainerProps extends IContentGeneralProps {
}

export type MCEditHeadProps = IContentGeneralProps;
export type MCEditBodyProps = IContentGeneralProps;
export type MCEditTailProps = IContentGeneralProps;

export type MCEditStatementProps = IContentGeneralProps;

export type MCEditChoicesProps = IContentGeneralProps;

export interface MCEditSingleChoiceProps extends IContentGeneralProps {
	choiceIndex: number;
};

export type MCEditSingleChoiceDecorationProps = IContentGeneralProps;

export type MCEditAddChoiceButtonProps = {
	onClick: () => void;
};
