import { QuestionEditContentCustomization } from "./types";
import { ContentType } from "@tests-core/schemas/questions/contnets/common-schemas";
import { defaultMCEditPassable } from "../multiple-choice/props/default-value";
import { defaultCommonEdit } from "../common/props/default-value";

export const defaultQuestionEditContentCustomization: QuestionEditContentCustomization = {
	[ContentType.MultipleChoice]: defaultMCEditPassable,
	common: defaultCommonEdit,
};
