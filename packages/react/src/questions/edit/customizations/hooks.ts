import { NormalizedQuestionEditContentCustomization } from "./types";
import { useNormalizedQuestionEditContextSubscriber } from "./providers";

export const useEditCustomizations = <
	K extends keyof NormalizedQuestionEditContentCustomization
>(
	key: K
): NormalizedQuestionEditContentCustomization[K] => {
	return useNormalizedQuestionEditContextSubscriber(x => x[key], [key]);
};

export const useEditFunctions = () => {
	return useNormalizedQuestionEditContextSubscriber(
		x => x.common.functions,
		[]
	);
};
