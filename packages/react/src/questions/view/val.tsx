import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { Common } from "./common/components";
import { MC } from "./multiple-choice/components";

export const QCusto = {
	common: Common,
	[ContentType.MultipleChoice]: MC,
};
