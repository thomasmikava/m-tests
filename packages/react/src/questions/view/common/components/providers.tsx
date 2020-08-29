import { WrapInCustHookChangeError } from "custo";
import React from "react";
import { CounterComponent } from "../../a";
import { commonHooks } from "../hooks";
import { ExplanationProps, TextComponentProps } from "./types";
import { useCustomizationProp } from "../hooks/helper";
import { CommonHooks } from ".";

export const Explanation: React.FC<ExplanationProps> = React.memo(
	({ path, forcefullyDisplay }) => {
		const explanation = commonHooks.useExplanation();
		const { displayExplanation } = commonHooks.useQuestionDisplaySettings();

		const Text: React.ComponentType<TextComponentProps> = useCustomizationProp(
			"components",
			path.add("text")
		);
		const Title = useCustomizationProp("texts", path.add("title"));
		const Cont = useCustomizationProp("elements", path.add("container"));
		const TitleCont = useCustomizationProp("elements", path.add("title"));
		const BodyCont = useCustomizationProp("elements", path.add("body"));

		if (!explanation) return null;
		if (!forcefullyDisplay && !displayExplanation) {
			return null;
		}

		return (
			<>
				<CounterComponent title={"explanation"} />
				<Cont>
					<TitleCont>
						<Title />
					</TitleCont>
					<BodyCont>
						<Text stat={explanation} path={path.add("text")} />
					</BodyCont>
				</Cont>
			</>
		);
	}
);

export const TextComponent = WrapInCustHookChangeError(
	React.memo(({ path, stat }: TextComponentProps) => {
		const Cont = useCustomizationProp("elements", path);
		const newText = CommonHooks.contentTextTransformer.use(
			stat.text
		);
		return <Cont>{newText}</Cont>;
	})
);

export const SimpleTextComponent = WrapInCustHookChangeError(
	React.memo(({ text }: { text: string }) => {
		const newText = CommonHooks.contentTextTransformer.use(text);
		return <React.Fragment>{newText}</React.Fragment>;
	})
);
