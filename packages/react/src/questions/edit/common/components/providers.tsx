/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from "react";
import {
	EditExplanationProps,
	EditTextComponentProps,
	IChooseQuestionContentTypeProps,
} from "./types";
import { commonEditHooks } from "../hooks";
import { useEditCustomizationProp } from "../hooks/helper";
import { useOptimizedFunc } from "../../../../utils/hooks";
import { ContentTypeChooseValue } from "../props/types";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { CommonEditCusto } from ".";
import { getChangedContent } from "../../helpers/default-content";
import { WrapInCustHookChangeError } from "custo";

export const EditExplanation: React.FC<EditExplanationProps> = React.memo(
	({ path }) => {
		const explanation = commonEditHooks.useExplanation();

		const Text: React.ComponentType<EditTextComponentProps> = useEditCustomizationProp(
			"components",
			path.add("text")
		);
		const usePlaceholder = useEditCustomizationProp(
			"texts",
			path.add("placeholder")
		);
		const Cont = useEditCustomizationProp(
			"elements",
			path.add("container")
		);

		const handleChange = commonEditHooks.useContentPathValueSetter(path);

		if (!explanation) return null;

		return (
			<Cont>
				<Text
					stat={explanation}
					path={path.add("text")}
					onChange={handleChange}
					usePlaceholder={usePlaceholder}
				/>
			</Cont>
		);
	}
);

export const ChooseQuestionContentType: React.FC<IChooseQuestionContentTypeProps> = React.memo(
	WrapInCustHookChangeError(
		({ selectedType, selectedDesignStructure, setContent }) => {
			const { ContentSelectorContainer } = CommonEditCusto.elements;
			const { Select } = CommonEditCusto.components;
			const options = CommonEditCusto.texts.contentTypes.options.use();
			const placeholder = CommonEditCusto.texts.contentTypes.Placeholder.use();

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
				<ContentSelectorContainer>
					<Select
						value={selectedOption}
						onChange={handleChange}
						options={options}
						placeholder={placeholder}
					/>
				</ContentSelectorContainer>
			);
		}
	)
);
