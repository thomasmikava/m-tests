import Joi from "joi";
import { CommonQuestionPartsSchema, StatementSchema } from "../common-schemas";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { RelationTypes } from "m-tests-core/lib/questions/grouping-items/types";
import { markKeysForbidden } from "../../helper";

export const GroupingItemsContentSchema = CommonQuestionPartsSchema.keys({
	type: Joi.number()
		.valid(ContentType.GroupingItems)
		.required(),
	statement: StatementSchema,
	groups: Joi.array()
		.items(StatementSchema)
		.required(),
	items: Joi.array()
		.items(StatementSchema)
		.required(),
	itemsToGroups: Joi.array()
		.items(
			Joi.object({
				itemId: Joi.number().required(),
				groupId: Joi.number().required(),
			})
		)
		.required(),
	relationType: Joi.number()
		.integer()
		.valid(...RelationTypes)
		.required(),
});

export const RGroupingItemsContentSchema = GroupingItemsContentSchema.fork(
	["explanation", "itemsToGroups"],
	markKeysForbidden
);

///
export const GroupingItemsUserAnsSchema = Joi.array().items(
	Joi.object({
		itemId: Joi.number().required(),
		groupId: Joi.number().required(),
	})
);
