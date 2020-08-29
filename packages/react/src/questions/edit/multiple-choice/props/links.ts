import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { QuestionEditContentCustomization } from "../../customizations/types";
import { customizationLinkFn } from "custo/lib/utils/objects";

export const linkMCEditProps = (
	link: customizationLinkFn,
	obj: QuestionEditContentCustomization
) => {
	const t = ContentType.MultipleChoice;
	/* eslint-disable */
	// Components
	link(obj.common.components.explanation, obj[t].components, "explanation");
	link(obj.common.components.text, obj[t].components.statement, "text");
	link(obj.common.components.text, obj[t].components.choices.single, "text");

	// Elements
	link(obj.common.elements.bodyContainer, obj[t].elements, "bodyContainer");
	link(obj.common.elements.innerContainers, obj[t].elements, "containers");
	link(obj.common.elements.text, obj[t].elements, "text");

	link(obj[t].elements.text, obj[t].elements.statement, "text");
	link(obj[t].elements.text, obj[t].elements.choices.single, "text");
	
	link(obj[t].elements.containers, obj[t].elements.statement, "container");
	link(obj[t].elements.containers, obj[t].elements.choices, "container");
	link(obj[t].elements.containers, obj[t].elements.choices.single, "container");
	link(obj[t].elements.containers, obj[t].elements.explanation, "container");
	
	link(obj.common.elements.explanation, obj[t].elements, "explanation");
	
	// Texts
	link(obj.common.texts.explanation, obj[t].texts, "explanation");
	/* eslint-enable */
};
