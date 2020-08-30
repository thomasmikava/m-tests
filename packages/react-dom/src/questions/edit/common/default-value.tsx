import { covertASCIIMathToLaTex } from "../../../editor/math";
import { reactDefaultCommonEditPassable } from "m-tests-react/lib/questions/edit/common/components/value";
import { normalizeHTML } from "../../../editor/html";
import {
	EditExplanation,
} from "m-tests-react/lib/questions/edit/common/components/providers";
import React from "react";
import {
	CommonEditPassable,
} from "m-tests-react/lib/questions/edit/common/props/types";
import { pckgDefComponents } from "m-tests-react/lib/utils/shortcuts";
import { CreateCusto } from "custo";
import { ChooseQuestionContentType, EditTextComponent, CheckboxWithLabel } from "./providers";

const defaultCommonEditComponents: CommonEditPassable["components"] = {
	Text: CreateCusto.hookOf.Component(() =>
		pckgDefComponents.newComp(EditTextComponent)
	),
	explanation: {
		Container: pckgDefComponents.newComp(EditExplanation),
	},
	ContentSelector: pckgDefComponents.newComp(ChooseQuestionContentType),
	CheckboxWithLabel: pckgDefComponents.newComp(CheckboxWithLabel)
};

const defaultCommonEditElements: CommonEditPassable["elements"] = {
	OuterContainer: pckgDefComponents.newDivEl({
		style: { fontFamily: "FiraGO", border: "2px solid red" },
	}),
	BodyContainer: pckgDefComponents.newDivEl(),
	explanation: {},
	Text: pckgDefComponents.newComp("textarea", { style: { border: "10px solid blue" } }),
};

const defaultContentTextTransformer = (text: string) => {
	return (
		<span
			dangerouslySetInnerHTML={{
				__html: covertASCIIMathToLaTex(normalizeHTML(text)),
			}}
		/>
	);
};

const defaultCommonEditHooks: CommonEditPassable["hooks"] = {
	contentTextTransformer: CreateCusto.Hook(
		defaultContentTextTransformer
	),
	nonContentTextTransformer: CreateCusto.Hook((x) => x),
};

export const defaultCommonEdit: CommonEditPassable = {
	components: defaultCommonEditComponents,
	elements: defaultCommonEditElements,
	texts: reactDefaultCommonEditPassable.texts,
	functions: reactDefaultCommonEditPassable.functions,
	hooks: defaultCommonEditHooks,
};
