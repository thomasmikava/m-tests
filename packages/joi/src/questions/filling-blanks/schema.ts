import {
	FBItemType,
	CheckStrictnessFields,
	FBContentDesignStructures,
	CheckerTypeFields,
	FBInputSizes,
} from "../../../content/questions/filling-blanks/types";
import Joi from "@hapi/joi";
import { CommonQuestionPartsSchema, StatementSchema } from "../common-schemas";
import { ContentType } from "../../../content/questions/common-schemas";
import { markKeysForbidden } from "new-tests/schemas/helper";

///

export const FBFileSchema = Joi.object({
	path: Joi.string().required(),
	name: Joi.string().required(),
	extra: Joi.any(),
});

///

export const FBTextItemSchema = StatementSchema.keys({
	type: Joi.number()
		.valid(FBItemType.Text)
		.required(),
	files: Joi.array().items(FBFileSchema),
});
///

export const IRInputItemSchema = Joi.object({
	id: Joi.number().required(),
	type: Joi.number()
		.valid(FBItemType.Input)
		.required(),
	size: Joi.string().valid(...FBInputSizes),
});

export const InputItemSchema = IRInputItemSchema.keys({
	score: Joi.number().required(),
	correctInputs: Joi.array()
		.items(StatementSchema)
		.required(),
	checkStrictness: Joi.number()
		.valid(...CheckStrictnessFields)
		.required(),
});

///

export const NonCheckableInputItemSchema = Joi.object({
	id: Joi.number().required(),
	type: Joi.number()
		.valid(FBItemType.NonCheckableInput)
		.required(),
	whoWillCheck: Joi.number()
		.valid(...CheckerTypeFields)
		.required(),
	size: Joi.string().valid(...FBInputSizes),
	uploadFiles: Joi.boolean(),
});

///

export const FillingBlanksContentSchema = CommonQuestionPartsSchema.keys({
	type: Joi.number()
		.valid(ContentType.FillingBlanks)
		.required(),
	items: Joi.array()
		.items(
			Joi.alternatives([
				FBTextItemSchema,
				InputItemSchema,
				NonCheckableInputItemSchema,
			])
		)
		.required(),
	ignoreOrderOfInputs: Joi.boolean(),
	designStructure: Joi.string().valid(...FBContentDesignStructures),
});

export const RFillingBlanksContentSchema = CommonQuestionPartsSchema.keys({
	type: Joi.number()
		.valid(ContentType.FillingBlanks)
		.required(),
	items: Joi.array()
		.items(
			Joi.alternatives([
				FBTextItemSchema,
				IRInputItemSchema,
				NonCheckableInputItemSchema,
			])
		)
		.required(),
	ignoreOrderOfInputs: Joi.boolean(),
	designStructure: Joi.string().valid(...FBContentDesignStructures),
}).fork("explanation", markKeysForbidden);

///

const FBItemUserAnswerSchema = StatementSchema.keys({
	files: Joi.array().items(FBFileSchema),
});

export const FillingBlanksUserAnsSchema = Joi.object()
	.pattern(/\d+/, FBItemUserAnswerSchema)
	.allow(null);
