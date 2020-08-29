import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { CommonEditCusto } from "./common/components";
import { MCEdit } from "./multiple-choice/components";

export const QEditCusto = {
	common: CommonEditCusto,
	[ContentType.MultipleChoice]: MCEdit,
};
