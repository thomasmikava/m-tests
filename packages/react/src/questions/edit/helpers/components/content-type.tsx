/* eslint-disable react-hooks/rules-of-hooks */
import { ContentType } from "@tests-core/schemas/questions/contnets/common-schemas";
import React, { useMemo } from "react";
import Select from "react-select";
import { IRawQuestionContent } from "@tests-core/schemas/questions/contnets/schemas";
import { getChangedContent } from "../default-content";
import { useOptimizedFunc } from "new-tests/utils/hooks";
import { ContentTypeChooseValue } from "../../common/props/types";
import { WrapInCustHookChangeError } from "custo";
import { CommonEdit } from "../../common/components";

export interface IChooseQuestionContentTypeProps {
	selectedType: ContentType | null;
	selectedDesignStructure: string | null;
	setContent: React.Dispatch<
		React.SetStateAction<IRawQuestionContent | undefined>
	>;
}

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
