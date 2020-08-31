import { normalizeLinkingFlags } from "../../../utils/shortcuts";
import { linkCommonEditProps } from "../common/props/links";
import { linkMCEditProps } from "../multiple-choice/props/links";
import {
	QuestionEditContentCustomization,
	NormalizedQuestionEditContentCustomization,
} from "./types";
import { flattenFlags } from "custo/lib/flags";
import { createLinkFn } from "custo/lib/utils/objects";
import { createProviders } from "custo";
import { createDeeplyOptimizedCustomizedPropsHook } from "custo/lib/utils/hooks";
import { deepCopyCustomizations } from "custo/lib/utils/deep-copy";

export const computeNormalizedEitCustomizations = ({
	value: customizations,
	meta,
}: {
	value: QuestionEditContentCustomization;
	meta: any;
}): NormalizedQuestionEditContentCustomization => {
	const flags = flattenFlags(meta);
	normalizeLinkingFlags(flags);
	const linkFn = createLinkFn({ flags });
	const newObj = deepCopyCustomizations(customizations);
	linkCommonEditProps(linkFn, newObj);
	linkMCEditProps(linkFn, newObj);
	return newObj as NormalizedQuestionEditContentCustomization;
};

const optimizedNormalizedCustomizations = createDeeplyOptimizedCustomizedPropsHook(
	computeNormalizedEitCustomizations,
	"global",
	v => v.value
);

const {
	Container: NormalizedQuestionEditContentCustomizationCont,
	...QuestionEditContentCustomizationProviders
} = createProviders<
	QuestionEditContentCustomization,
	NormalizedQuestionEditContentCustomization
>({
	defaultValue: undefined,
	rawToFinalValueHook: optimizedNormalizedCustomizations,
});

export {
	NormalizedQuestionEditContentCustomizationCont,
	QuestionEditContentCustomizationProviders,
};

export const useNormalizedQuestionEditContextSubscriber =
	NormalizedQuestionEditContentCustomizationCont.context.useSelector;
