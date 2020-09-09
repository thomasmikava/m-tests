import { QuestionEditContentCustomization } from "m-tests-react/lib/questions/edit/customizations/types";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { defaultMCEditPassable } from "../multiple-choice/default-value";
import { defaultCommonEdit } from "../common/default-value";
import { CustoProviderRawValue } from "custo";
import { wrapAsPackageCusto } from "m-tests-react/lib/utils/shortcuts";

export const defaultQuestionEditContentCustoRawValue: CustoProviderRawValue<QuestionEditContentCustomization> = {
	value: wrapAsPackageCusto({
		[ContentType.MultipleChoice]: defaultMCEditPassable,
		common: defaultCommonEdit,
	}),
};
