import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { QuestionContentCustomization } from "../../customizations/types";
import { customizationLinkFn } from "custo/lib/utils/objects";

export const linkMCProps = (
	link: customizationLinkFn,
	obj: QuestionContentCustomization
) => {
	const t = ContentType.MultipleChoice;
	/* eslint-disable */
	// Components
	link(obj.common.components.explanation, obj[t].components, "explanation");
	link(obj.common.components.Text, obj[t].components.statement, "Text");
	link(obj.common.components.Text, obj[t].components.choices.single, "Text");

	// Elements
	link(obj.common.elements.BodyContainer, obj[t].elements, "BodyContainer");
	link(obj.common.elements.InnerContainers, obj[t].elements, "Containers");
	link(obj.common.elements.Text, obj[t].elements, "Text");

	link(obj[t].elements.Text, obj[t].elements.statement, "Text");
	link(obj[t].elements.Text, obj[t].elements.choices.single, "Text");
	link(obj[t].elements.Text, obj[t].elements.explanation, "Text");
	
	link(obj[t].elements.Containers, obj[t].elements.statement, "Container");
	link(obj[t].elements.Containers, obj[t].elements.choices, "Container");
	link(obj[t].elements.Containers, obj[t].elements.choices.single, "Container");
	link(obj[t].elements.Containers, obj[t].elements.explanation, "Container");
	
	link(obj.common.elements.explanation, obj[t].elements, "explanation");
	
	// Texts
	link(obj.common.texts.explanation, obj[t].texts, "explanation");
	/* eslint-enable */
};
