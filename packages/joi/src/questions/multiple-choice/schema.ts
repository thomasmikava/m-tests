import Joi from "joi";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { MCContentDesignStructures } from "m-tests-core/lib/questions/multiple-choice/types";
import { CommonQuestionPartsSchema, StatementSchema } from "../common-schemas";

export const MultipleChoiceContentSchema = CommonQuestionPartsSchema.keys({
	type: Joi.number()
		.valid(ContentType.MultipleChoice)
		.required(),
	statement: StatementSchema.unknown(true).required(),
	choices: Joi.array()
		.items(
			StatementSchema.keys({
				score: Joi.number().optional(),
			})
		)
		.required(),
	canSelectMultiple: Joi.boolean(),
	disableShuffle: Joi.boolean(),
	designStructure: Joi.string().valid(...MCContentDesignStructures),
}).unknown(true);

export const RMultipleChoiceContentSchema = MultipleChoiceContentSchema.keys({
	choices: Joi.array()
		.items(StatementSchema)
		.required(),
});

export const MultipleChoiceUserAnsSchema = Joi.alternatives(
	Joi.array()
		.items(Joi.number())
		.allow(null),
	Joi.number().allow(null)
);
