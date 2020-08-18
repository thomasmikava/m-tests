import { ContentType } from "@tests-core/schemas/questions/contnets/common-schemas";
import { MCEditPassable } from "../multiple-choice/props/types";
import { CommonEditPassable } from "../common/props/types";
import { DeeplyRequired, DeeplyOptional } from "new-tests/utils/generics";

export interface QuestionEditContentCustomization {
	[ContentType.MultipleChoice]: MCEditPassable;
	common: CommonEditPassable;
}

export type NormalizedQuestionEditContentCustomization = DeeplyRequired<
	QuestionEditContentCustomization
>;

export type OptionalQuestionEditContentCustomization = DeeplyOptional<
	QuestionEditContentCustomization
>;
