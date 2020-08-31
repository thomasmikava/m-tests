/* eslint-disable react-hooks/rules-of-hooks */
import { normalizeLinkingFlags } from "../../../utils/shortcuts";
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
import { createProviders } from "custo";

const computeNormalizedCustomizations = ({
	value: customizations,
	meta,
}: {
	value: QuestionContentCustomization;
	meta: any;
}): NormalizedQuestionContentCustomization => {
	const flags = flattenFlags(meta);
	normalizeLinkingFlags(flags);
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
} = createProviders<
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
