import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { defaultCommonPasable } from "../common/default-value";
import { QuestionContentCustomization } from "m-tests-react/lib/questions/view/customizations/types";
import { defaultMCPassable } from "../multiple-choice/default-value";

export const defaultQuestionContentCustomization: QuestionContentCustomization = {
	[ContentType.MultipleChoice]: defaultMCPassable,
	common: defaultCommonPasable,
};
