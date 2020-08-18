import { ContentType } from "../../../../content/questions/common-schemas";
import { defaultCommonPasable } from "../common/props/default-value";
import { QuestionContentCustomization } from "./types";
import { defaultMCPassable } from "../multiple-choice/props/default-value";

export const defaultQuestionContentCustomization: QuestionContentCustomization = {
	[ContentType.MultipleChoice]: defaultMCPassable,
	common: defaultCommonPasable,
};
