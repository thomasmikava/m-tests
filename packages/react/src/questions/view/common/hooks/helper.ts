/* eslint-disable react-hooks/rules-of-hooks */
import { ContentPath } from "m-tests-core/lib/utils/path";
import { commonHooks } from ".";
import { NormalizedQuestionContentCustomization } from "../../customizations/types";
import { QCusto } from "../../val";
import { getAbsoluteProperty } from "../../../../utils/prop";

export const useCustomizationProp = <
	T extends keyof NormalizedQuestionContentCustomization[keyof NormalizedQuestionContentCustomization]
>(
	type: T,
	path: ContentPath
): any => {
	const contentType = commonHooks.useContentType();
	const key = contentPathToPropsPath(path.relativePath);
	const obj = (QCusto[contentType as any] || QCusto.common)[type];
	return getAbsoluteProperty(obj, key);
};

export const contentPathToPropsPath = (str: string) => {
	const p = str.split(".");
	return p
		.map(e => {
			if (+e + "" === e) return "single"; // replace indexes with `single` keyword
			return e;
		})
		.join(".");
};
