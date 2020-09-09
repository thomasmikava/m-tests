import { createComponentsTransformation } from "custo";
import { CustomizableLabels } from "custo/lib/flags";

export const wrapAsPackageCusto = createComponentsTransformation(
	{},
	{
		labels: [CustomizableLabels.packageDefaultValue],
	}
);
