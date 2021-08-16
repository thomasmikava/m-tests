/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useImperativeHandle, useMemo, useState } from "react";
import {
	EditExplanationProps,
	EditTextComponentProps,
	IChooseQuestionContentTypeProps,
	IChooseQuestionContentTypeRef,
} from "./types";
import { commonEditHooks } from "../hooks";
import { useEditCustomizationProp } from "../hooks/helper";
import { useOptimizedFunc } from "../../../../utils/hooks";
import { EmptyContentCreationSettings } from "m-tests-core/lib/questions/common-schemas";
import { CommonEditCusto } from ".";
import { WrapInCustHookChangeError } from "custo";
import { ContentTypeChooseOption } from "../props/types";

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
	WrapInCustHookChangeError(React.forwardRef<IChooseQuestionContentTypeRef, IChooseQuestionContentTypeProps>(
		({ setContent, defaultSettings }, ref) => {
			const { ContentSelectorContainer } = CommonEditCusto.elements;
			const { Select } = CommonEditCusto.components;
			const options = CommonEditCusto.texts.contentTypes.options.use();
			const placeholder = CommonEditCusto.texts.contentTypes.Placeholder.use();
			const getChangedContent = CommonEditCusto.functions.getChangedContentFn.use();
			
			const [settings, setSettings] = useState(defaultSettings); 
			
			const handleSettingsChange = useOptimizedFunc((settings: EmptyContentCreationSettings) => {
				setSettings(settings);
				setContent(content =>
					getChangedContent({
						oldContent: content,
						newContentSettings: settings,
					})
				);
			});

			const handleChange = useCallback((option: ContentTypeChooseOption) => {
				handleSettingsChange(option.value);
			}, [handleSettingsChange]);

			useImperativeHandle(ref, () => ({
				getSettings: () => settings,
				setSettings: handleSettingsChange
			}), [settings, handleSettingsChange]);

			const selectedOption = useMemo(() => {
				if (!settings) return undefined;
				return options.find(
					e => areEqualOnDepth1(e.value, settings)
				);
			}, [options, settings]);

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
));

function areEqualOnDepth1(o1: any, o2: any){ // FIXME: import from another package? probably use propsComparison from m-tests-core
    for(var p in o1){
        if(o1.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    for(var p in o2){
        if(o2.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    return true;
};