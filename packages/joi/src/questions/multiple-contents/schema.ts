import { markKeysForbidden } from "../../helper";
import Joi from "joi";
import {
	CommonQuestionPartsSchema,
	TextStatementSchema,
} from "../common-schemas";
import {
	FillingBlanksContentSchema,
	RFillingBlanksContentSchema,
} from "../filling-blanks/schema";
import {
	GroupingItemsContentSchema,
	RGroupingItemsContentSchema,
} from "../grouping-items/schema";
import {
	MultipleChoiceContentSchema,
	RMultipleChoiceContentSchema,
} from "../multiple-choice/schema";
import {
	RSortItemsContentSchema,
	SortItemsContentSchema,
} from "../sort-items/schema";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";

export const MultipleContentsSchema = CommonQuestionPartsSchema.keys({
	type: Joi.number()
		.valid(ContentType.MultipleContents)
		.required(),
	items: Joi.array()
		.items(
			Joi.object({
				id: Joi.number().required(),
				content: Joi.alternatives(
					MultipleChoiceContentSchema,
					SortItemsContentSchema,
					GroupingItemsContentSchema,
					FillingBlanksContentSchema,
					TextStatementSchema.fork("id", markKeysForbidden),
					Joi.link("#MultipleContentsSchema")
				).required(),
				settings: Joi.object({
					nextContentOnSamePage: Joi.boolean(),
				}),
			})
		)
		.required(),
	restrictViewingPagesBeforehand: Joi.boolean(),
}).id("MultipleContentsSchema");

///

export const RMultipleContentsSchema = CommonQuestionPartsSchema.keys({
	type: Joi.number()
		.valid(ContentType.MultipleContents)
		.required(),
	items: Joi.array()
		.items(
			Joi.object({
				id: Joi.number().required(),
				content: Joi.alternatives(
					RMultipleChoiceContentSchema,
					RSortItemsContentSchema,
					RGroupingItemsContentSchema,
					RFillingBlanksContentSchema,
					TextStatementSchema.fork("id", markKeysForbidden),
					Joi.link("#RMultipleContentsSchema")
				).required(),
				settings: Joi.object({
					nextContentOnSamePage: Joi.boolean(),
				}),
			})
		)
		.required(),
	restrictViewingPagesBeforehand: Joi.boolean(),
}).id("RMultipleContentsSchema") as any;
