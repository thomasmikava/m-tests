import { covertASCIIMathToLaTex } from "../../../editor/math";
import { reactDefaultCommonEditPassable } from "m-tests-react/lib/questions/edit/common/components/value";
import { normalizeHTML } from "../../../editor/html";
import {
	EditExplanation,
	ChooseQuestionContentType,
} from "m-tests-react/lib/questions/edit/common/components/providers";
import React from "react";
import { CommonEditPassable } from "m-tests-react/lib/questions/edit/common/props/types";
import { cDom } from "../../utils";
import { CreateCusto } from "custo";
import {
	EditTextComponent,
	CheckboxWithLabel,
	NativeSelect,
} from "./providers";

const defaultCommonEditComponents: CommonEditPassable["components"] = cDom.asComp(
	{
		Text: CreateCusto.hookOf.Component(() => EditTextComponent),
		explanation: {
			Container: EditExplanation,
		},
		ContentSelector: ChooseQuestionContentType,
		CheckboxWithLabel: CheckboxWithLabel,
		Select: NativeSelect,
	}
);

const defaultCommonEditElements: CommonEditPassable["elements"] = {
	OuterContainer: cDom.newDiv(),
	BodyContainer: cDom.newDiv(),
	explanation: {},
	Text: cDom.newComp("textarea"),
	ContentSelectorContainer: cDom.newDiv(),
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
	contentTextTransformer: CreateCusto.Hook(defaultContentTextTransformer),
	nonContentTextTransformer: CreateCusto.Hook(x => x),
};

export const defaultCommonEdit: CommonEditPassable = {
	components: defaultCommonEditComponents,
	elements: defaultCommonEditElements,
	texts: reactDefaultCommonEditPassable.texts,
	functions: reactDefaultCommonEditPassable.functions,
	hooks: defaultCommonEditHooks,
};
