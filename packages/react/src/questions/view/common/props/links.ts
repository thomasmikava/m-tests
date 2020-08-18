import { QuestionContentCustomization } from "../../customizations/types";
import { customizationLinkFn } from "custo/lib/utils/objects";

export const linkCommonProps = (
	link: customizationLinkFn,
	obj: QuestionContentCustomization
) => {
	/* eslint-disable */
	link(obj.common.components.text, obj.common.components.explanation, "text");

	link(obj.common.elements.text, obj.common.elements.explanation, "text");
	link(obj.common.elements.innerContainers, obj.common.elements.explanation, "container");
	/* eslint-enable */
};
