import { IContentGeneralProps } from "../../interfaces";
import { IStatement } from "m-tests-core/lib/questions/common-schemas";

export type TextComponentProps = IContentGeneralProps & {
	stat: IStatement;
};

export type ExplanationProps = IContentGeneralProps & {
	forcefullyDisplay?: boolean;
};

export interface CheckboxWithLabelProps {
	onChange: (checked: boolean) => void;
	value: boolean;
	label?: JSX.Element | string | number | null;
}

export interface SelectProps<
	V extends { label: string | JSX.Element | null; value: any } = {
		label: string | JSX.Element | null;
		value: any;
	}
> {
	value: V | undefined;
	onChange: (value: V) => void;
	options: V[];
	placeholder?: string | null;
}
