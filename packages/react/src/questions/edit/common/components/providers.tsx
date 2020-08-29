/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { EditExplanationProps, EditTextComponentProps } from "./types";
import { commonEditHooks } from "../hooks";
import { useEditCustomizationProp } from "../hooks/helper";
import { CounterComponent } from "../../../view/a";


export const EditExplanation: React.FC<EditExplanationProps> = React.memo(
	({ path }) => {
		const explanation = commonEditHooks.useExplanation();

		const Text: React.ComponentType<EditTextComponentProps> = useEditCustomizationProp(
			"components",
			path.add("text")
		);
		const usePlaceholder = useEditCustomizationProp("texts", path.add("placeholder"));
		const Cont = useEditCustomizationProp("elements", path.add("container"));

		const handleChange = commonEditHooks.useContentPathValueSetter(path);

		if (!explanation) return null;

		return (
			<>
				<CounterComponent title={"explanation"} />
				<Cont>
					<Text stat={explanation} path={path.add("text")} onChange={handleChange} usePlaceholder={usePlaceholder} />
				</Cont>
			</>
		);
	}
);
