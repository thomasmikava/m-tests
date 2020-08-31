import { IContentGeneralProps } from "../../../view/interfaces";

export type MultipleChoiceEditContainerProps = IContentGeneralProps;

export type MCEditHeadProps = IContentGeneralProps;
export type MCEditBodyProps = IContentGeneralProps;
export type MCEditTailProps = IContentGeneralProps;

export type MCEditStatementProps = IContentGeneralProps;

export type MCEditChoicesProps = IContentGeneralProps;

export interface MCEditSingleChoiceProps extends IContentGeneralProps {
	id: number;
	index: number;
}

export type MCEditSingleChoiceDecorationProps = IContentGeneralProps & {
	dir: "left" | "right";
};

export type MCEditAddChoiceButtonProps = {
	onClick: () => void;
};
