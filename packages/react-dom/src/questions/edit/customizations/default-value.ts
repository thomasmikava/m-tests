import { QuestionEditContentCustomization } from "m-tests-react/lib/questions/edit/customizations/types";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { defaultMCEditPassable } from "../multiple-choice/default-value";
import { defaultCommonEdit } from "../common/default-value";

export const defaultQuestionEditContentCustomization: QuestionEditContentCustomization = {
	[ContentType.MultipleChoice]: defaultMCEditPassable,
	common: defaultCommonEdit,
};
