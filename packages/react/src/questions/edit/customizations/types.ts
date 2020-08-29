import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { MCEditPassable } from "../multiple-choice/props/types";
import { CommonEditPassable } from "../common/props/types";
import {
	DeeplyRequired,
	DeeplyOptional,
} from "custo/lib/utils/generics";

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
