import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { MCEditPassable } from "../multiple-choice/props/types";
import { CommonEditPassable } from "../common/props/types";
import { DeeplyRequired, DeeplyOptional } from "custo/lib/utils/generics";
import { ToVeryGeneralCusto } from "custo/lib/utils/prop-generics";

export interface QuestionEditContentCustomization {
	[ContentType.MultipleChoice]: MCEditPassable;
	common: CommonEditPassable;
}

export type NormalizedQuestionEditContentCustomization = DeeplyRequired<
	ToVeryGeneralCusto<QuestionEditContentCustomization>
>;

export type OptionalQuestionEditContentCustomization = DeeplyOptional<
	ToVeryGeneralCusto<QuestionEditContentCustomization>
>;
