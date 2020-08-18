/* eslint-disable react-hooks/rules-of-hooks */
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import React, { useMemo } from "react";
import Select from "react-select";
import { getChangedContent } from "m-tests-react/lib/questions/edit/helpers/default-content";
import { useOptimizedFunc } from "m-tests-react/lib/utils/hooks";
import { ContentTypeChooseValue } from "m-tests-react/lib/questions/edit/common/props/types";
import { WrapInCustHookChangeError } from "custo";
import { CommonEdit } from "m-tests-react/lib/questions/edit/common/components";
import { IChooseQuestionContentTypeProps } from "m-tests-react/lib/questions/edit/common/components/providers";

// FIXME: move this to dom package
export const ChooseQuestionContentType: React.FC<IChooseQuestionContentTypeProps> = React.memo(
	WrapInCustHookChangeError(
		({ selectedType, selectedDesignStructure, setContent }) => {
			const options = CommonEdit.texts.contentTypes.use();

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
					<Select
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
