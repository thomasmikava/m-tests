import { ContentType } from "../../../../content/questions/common-schemas";
import { DeeplyOptional, DeeplyRequired } from "new-tests/utils/generics";
import { CommonPassable } from "../common/props/types";
import { MCPassable } from "../multiple-choice/props/types";

export interface QuestionContentCustomization {
	[ContentType.MultipleChoice]: MCPassable;
	common: CommonPassable;
}

export type NormalizedQuestionContentCustomization = DeeplyRequired<
	QuestionContentCustomization
>;
export type OptionalQuestionContentCustomization = DeeplyOptional<
	QuestionContentCustomization
>;
