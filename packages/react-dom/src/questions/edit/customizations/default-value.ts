import { QuestionEditContentCustomization } from "m-tests-react/lib/questions/edit/customizations/types";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { defaultMCEditPassable } from "../multiple-choice/default-value";
import { defaultCommonEdit } from "../common/default-value";
import { CustoProviderRawValue } from "custo";
import { wrapAsPackageCusto } from "m-tests-react/lib/utils/shortcuts";
import { ToVeryGeneralCusto } from "custo/lib/utils/prop-generics";

export const defaultQuestionEditContentCustoRawValue: CustoProviderRawValue<ToVeryGeneralCusto<QuestionEditContentCustomization>> = {
	value: {
		[ContentType.MultipleChoice]: defaultMCEditPassable,
		common: defaultCommonEdit,
	},
};
