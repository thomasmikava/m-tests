/* eslint-disable react-hooks/rules-of-hooks */
import { linkCommonProps } from "../common/props/links";
import { linkMCProps } from "../multiple-choice/props/links";
import {
	QuestionContentCustomization,
	NormalizedQuestionContentCustomization,
} from "./types";
import { flattenFlags } from "custo/lib/flags";
import { createLinkFn } from "custo/lib/utils/objects";
import { deepCopyCustomizations } from "custo/lib/utils/deep-copy";
import { createDeeplyOptimizedCustomizedPropsHook } from "custo/lib/utils/hooks";
import { buildCusto, CustoProviderRawValue } from "custo";

const computeNormalizedCustomizations = ({
	value: customizations,
	mergeFlags,
}: CustoProviderRawValue<
	QuestionContentCustomization
>): NormalizedQuestionContentCustomization => {
	const flags = flattenFlags(mergeFlags || []);
	const linkFn = createLinkFn({ flags });
	const newObj = deepCopyCustomizations(customizations);
	linkCommonProps(linkFn, newObj);
	linkMCProps(linkFn, newObj);
	return newObj as NormalizedQuestionContentCustomization;
};

const optimizedNormalizedCustomizations = createDeeplyOptimizedCustomizedPropsHook(
	computeNormalizedCustomizations,
	"global",
	v => v.value
);

const {
	Container: NormalizedQuestionContentCustomizationCont,
	...QuestionContentCustomizationProviders
} = buildCusto<
	QuestionContentCustomization,
	NormalizedQuestionContentCustomization
>({
	defaultValue: undefined,
	rawToFinalValueHook: optimizedNormalizedCustomizations,
});

export {
	NormalizedQuestionContentCustomizationCont,
	QuestionContentCustomizationProviders,
};

export const useNormalizedQuestionContextSelector =
	NormalizedQuestionContentCustomizationCont.context.useSelector;
