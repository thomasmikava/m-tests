import Joi from "joi";
import {
	ContentTypesFields,
	ContentType,
} from "m-tests-core/lib/questions/common-schemas";

///

export const StatementSchema = Joi.object({
	id: Joi.number().required(),
	text: Joi.string()
		.allow("")
		.required(),
});

///

export const TextStatementSchema = StatementSchema.keys({
	type: Joi.number()
		.valid(ContentType.Text)
		.required(),
});
///

export const CommonQuestionPartsSchema = Joi.object({
	type: Joi.number()
		.valid(...ContentTypesFields)
		.required(),
	explanation: StatementSchema,
	allowPartialCredit: Joi.boolean(),
	minScoreForCredit: Joi.number().allow(null),
});

///
