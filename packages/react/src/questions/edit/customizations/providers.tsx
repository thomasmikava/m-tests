import { linkCommonEditProps } from "../common/props/links";
import { linkMCEditProps } from "../multiple-choice/props/links";
import {
	QuestionEditContentCustomization,
	NormalizedQuestionEditContentCustomization,
} from "./types";
import { flattenFlags } from "custo/lib/flags";
import { createLinkFn } from "custo/lib/utils/objects";
import { buildCusto, CustoProviderRawValue } from "custo";
import { createDeeplyOptimizedCustomizedPropsHook } from "custo/lib/utils/hooks";
import { deepCopyCustomizations } from "custo/lib/utils/deep-copy";

export const computeNormalizedEitCustomizations = ({
	value: customizations,
	mergeFlags,
}: CustoProviderRawValue<
	QuestionEditContentCustomization
>): NormalizedQuestionEditContentCustomization => {
	const flags = flattenFlags(mergeFlags || []);
	const linkFn = createLinkFn({ flags });
	const newObj = deepCopyCustomizations(customizations);
	linkCommonEditProps(linkFn, newObj);
	linkMCEditProps(linkFn, newObj);
	return (newObj as any) as NormalizedQuestionEditContentCustomization;
};

const optimizedNormalizedCustomizations = createDeeplyOptimizedCustomizedPropsHook(
	computeNormalizedEitCustomizations,
	"global",
	v => v.value
);

const {
	Container: NormalizedQuestionEditContentCustomizationCont,
	...rest
} = buildCusto<
	QuestionEditContentCustomization,
	NormalizedQuestionEditContentCustomization
>({
	defaultValue: undefined,
	rawToFinalValueHook: optimizedNormalizedCustomizations,
});

const QuestionEditContentCustomizationProviders = rest as any;

export {
	NormalizedQuestionEditContentCustomizationCont,
	QuestionEditContentCustomizationProviders,
};

export const useNormalizedQuestionEditContextSubscriber =
	NormalizedQuestionEditContentCustomizationCont.context.useSelector;
