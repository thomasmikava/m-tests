import { AnySchema } from "@hapi/joi";

export const markKeysOptional = (schema: AnySchema) => schema.optional();
export const markKeysForbidden = (schema: AnySchema) => schema.forbidden();
export const markKeysStripped = (schema: AnySchema) =>
	schema.optional().strip();
