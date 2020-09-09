import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { defaultCommonPasable } from "../common/default-value";
import { QuestionContentCustomization } from "m-tests-react/lib/questions/view/customizations/types";
import { defaultMCPassable } from "../multiple-choice/default-value";
import { CustoProviderRawValue } from "custo";
import { wrapAsPackageCusto } from "m-tests-react/lib/utils/shortcuts";

export const defaultQuestionContentCustoRawValue: CustoProviderRawValue<QuestionContentCustomization> = {
	value: wrapAsPackageCusto({
		[ContentType.MultipleChoice]: defaultMCPassable,
		common: defaultCommonPasable,
	}),
};
