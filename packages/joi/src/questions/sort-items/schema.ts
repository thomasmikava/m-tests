import { markKeysForbidden } from "../../helper";
import Joi from "joi";
import { CommonQuestionPartsSchema, StatementSchema } from "../common-schemas";
import {
	forbiddenProperties,
	ContentType,
} from "m-tests-core/lib/questions/common-schemas";

export const SortItemsContentSchema = CommonQuestionPartsSchema.keys({
	type: Joi.number()
		.valid(ContentType.SortItems)
		.required(),
	statement: StatementSchema.required(),
	items: Joi.array()
		.items(StatementSchema)
		.required(),
	correctOrder: Joi.array()
		.items(Joi.number())
		.required(),
});

export const RSortItemsContentSchema = SortItemsContentSchema.fork(
	[...forbiddenProperties, "correctOrder"],
	markKeysForbidden
);

export const SortItemsUserAnsSchema = Joi.array()
	.items(Joi.number())
	.allow(null);
