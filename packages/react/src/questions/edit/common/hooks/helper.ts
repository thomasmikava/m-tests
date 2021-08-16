import { ContentPath } from "m-tests-core/lib/utils/path";
import { commonEditHooks } from ".";
import { getAbsoluteProperty } from "../../../../utils/prop";
import { contentPathToPropsPath } from "../../../view/common/hooks/helper";
import { NormalizedQuestionEditContentCustomization } from "../../customizations/types";
import { QEditCusto } from "../../val";

export const useEditCustomizationProp = <
	T extends keyof NormalizedQuestionEditContentCustomization[keyof NormalizedQuestionEditContentCustomization]
>(
	type: T,
	path: ContentPath
): any => {
	const contentType = commonEditHooks.useContentType();
	const key = contentPathToPropsPath(path.relativePath);
	const obj = (QEditCusto[contentType as any] || QEditCusto.common)[type];
	return getAbsoluteProperty(obj, key);
};
