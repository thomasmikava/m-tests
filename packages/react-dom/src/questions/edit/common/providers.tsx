/* eslint-disable react-hooks/rules-of-hooks */
import { WrapInCustHookChangeError } from "custo";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { CommonEditCusto } from "m-tests-react/lib/questions/edit/common/components";
import { IChooseQuestionContentTypeProps } from "m-tests-react/lib/questions/edit/common/components/types";
import { EditTextComponentProps } from "m-tests-react/lib/questions/edit/common/components/types";
import { useEditCustomizationProp } from "m-tests-react/lib/questions/edit/common/hooks/helper";
import { ContentTypeChooseValue } from "m-tests-react/lib/questions/edit/common/props/types";
import { getChangedContent } from "m-tests-react/lib/questions/edit/helpers/default-content";
import { useOptimizedFunc } from "m-tests-react/lib/utils/hooks";
import React, {
	useCallback,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { CheckboxWithLabelProps } from "m-tests-react/lib/questions/view/common/components/types";

// FIXME: move this to dom package
export const ChooseQuestionContentType: React.FC<IChooseQuestionContentTypeProps> = React.memo(
	WrapInCustHookChangeError(
		({ selectedType, selectedDesignStructure, setContent }) => {
			const options = CommonEditCusto.texts.contentTypes.use();

			const onContentChange = ({
				contentType,
				designStructure,
			}: {
				contentType: ContentType;
				designStructure: string | null;
			}) => {
				setContent(content =>
					getChangedContent({
						oldContent: content,
						newContentType: contentType,
						newDesignStructure: designStructure,
					})
				);
			};

			const handleChange = useOptimizedFunc(
				(select: { value: ContentTypeChooseValue; label: string }) => {
					onContentChange({
						contentType: select.value.contentType,
						designStructure: select.value.designStructure,
					});
				}
			);

			const selectedOption = useMemo(() => {
				return selectedType === undefined
					? undefined
					: options.find(
							e =>
								e.value.contentType === selectedType &&
								e.value.designStructure ===
									selectedDesignStructure
					  );
			}, [options, selectedDesignStructure, selectedType]);

			return (
				<div style={{ marginBottom: 30 }}>
					<NativeSelect
						value={selectedOption}
						onChange={handleChange}
						options={options}
						placeholder={"Choose Question Type"}
					/>
				</div>
			);
		}
	)
);

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
			const haRef = useRef<any>(null);
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
				}
			}, []);

			useLayoutEffect(() => {
				if (haRef.current) {
					haRef.current.value = stat.text;
				}
			});

			return (
				<Cont
					placeholder={placeholder}
					ref={haRef}
					onChange={handleChange}
					defaultValue={stat.text}
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
