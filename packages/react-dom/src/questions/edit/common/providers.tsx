/* eslint-disable react-hooks/rules-of-hooks */
import { WrapInCustHookChangeError } from "custo";
import { EditTextComponentProps } from "m-tests-react/lib/questions/edit/common/components/types";
import { useEditCustomizationProp } from "m-tests-react/lib/questions/edit/common/hooks/helper";
import { CheckboxWithLabelProps } from "m-tests-react/lib/questions/view/common/components/types";
import { useOptimizedFunc } from "m-tests-react/lib/utils/hooks";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

interface NativeSelectProps<
	V extends { label: string | JSX.Element | null; value: any }
> {
	value: V | undefined;
	onChange: (value: V) => void;
	options: V[];
	placeholder?: string | null;
}

export const NativeSelect: <V extends {
	label: string | JSX.Element | null;
	value: any;
}>(
	props: NativeSelectProps<V>
) => JSX.Element | null = React.memo(
	({ value, onChange, options, placeholder }) => {
		const selectedIndex = value
			? options.findIndex(e => e.value === value.value)
			: -1;

		const handleChange = useOptimizedFunc(event => {
			const index = +event.target.value;
			const option = options[index];
			if (!option) return;
			onChange(option);
		});

		return (
			<select
				value={selectedIndex}
				placeholder={placeholder || undefined}
				onChange={handleChange}
			>
				<option value={-1} hidden>
					{placeholder}
				</option>
				{options.map((option, index) => {
					return (
						<option key={index} value={index}>
							{option.label}
						</option>
					);
				})}
			</select>
		);
	}
);

export const EditTextComponent = WrapInCustHookChangeError(
	React.memo(
		({ path, stat, usePlaceholder, onChange }: EditTextComponentProps) => {
			const Cont = useEditCustomizationProp("elements", path);
			const placeholder = usePlaceholder
				? usePlaceholder.use()
				: usePlaceholder;

			const handleChange = useCallback((e: unknown) => {
				if (e && typeof e === "object" && (e as any).target) {
					const text = (e as any).target.value;
					onChange(old => ({
						...old,
						text,
					}));
				} else {
					onChange(old => ({
						...old,
						text: e as any,
					}));
				}
			}, []);

			return (
				<Cont
					placeholder={placeholder}
					onChange={handleChange}
					value={stat.text}
				/>
			);
		}
	)
);

export const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = React.memo(
	({ onChange, value, label }) => {
		const [id] = useState(generateId);
		const handleChange = useOptimizedFunc(e => {
			const checked = !!e.target.checked;
			onChange(checked);
		});
		return (
			<div>
				<input
					type="checkbox"
					id={id}
					checked={value}
					onChange={handleChange}
				/>
				<label htmlFor={id}>{label}</label>
			</div>
		);
	}
);

const generateId = () => {
	return "a" + Math.random() + new Date().getTime();
};
