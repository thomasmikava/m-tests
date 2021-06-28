import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { defaultCommonPasable } from "../common/default-value";
import { QuestionContentCustomization } from "m-tests-react/lib/questions/view/customizations/types";
import { defaultMCPassable } from "../multiple-choice/default-value";
import { CustoProviderRawValue } from "custo";
import { wrapAsPackageCusto } from "m-tests-react/lib/utils/shortcuts";
import { ToVeryGeneralCusto } from "custo/lib/utils/prop-generics";

export const defaultQuestionContentCustoRawValue: CustoProviderRawValue<ToVeryGeneralCusto<QuestionContentCustomization>> = {
	value: {
		[ContentType.MultipleChoice]: defaultMCPassable,
		common: defaultCommonPasable,
	},
};
