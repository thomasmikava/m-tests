import { QuestionEditContentCustomization } from "../../customizations/types";
import { customizationLinkFn } from "custo/lib/utils/objects";

export const linkCommonEditProps = (
	link: customizationLinkFn,
	obj: QuestionEditContentCustomization
) => {
	/* eslint-disable */
		link(obj.common.components.Text, obj.common.components.explanation, "Text");

		link(obj.common.elements.Text, obj.common.elements.explanation, "Text");
		link(obj.common.elements.InnerContainers, obj.common.elements.explanation, "Container");
		/* eslint-enable */
};
