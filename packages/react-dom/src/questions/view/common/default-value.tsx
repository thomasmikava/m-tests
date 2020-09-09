/* eslint-disable react-hooks/rules-of-hooks */
import { cDom } from "../../utils";
import { normalizeHTML } from "../../../editor/html";
import { covertASCIIMathToLaTex } from "../../../editor/math";
import { reactDefaultCommonPassable } from "m-tests-react/lib/questions/view/common/components/value";
import { CommonPassable } from "m-tests-react/lib/questions/view/common/props/types";
import { CreateCusto } from "custo";
import React from "react";

const defaultCommonElements: CommonPassable["elements"] = {
	OuterContainer: cDom.div,
	BodyContainer: cDom.div,
	InnerContainers: cDom.div,
	Text: cDom.div,
	explanation: {
		Title: cDom.div,
		Body: cDom.div,
	},
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

const defaultCommonHooks: CommonPassable["hooks"] = {
	contentTextTransformer: CreateCusto.Hook(defaultContentTextTransformer),
	/* nonContentTextTransformer: CreateCusto.Hook(
		text => (text || "").toString() + "@@"
	), */
};

export const defaultCommonPasable: CommonPassable = {
	components: reactDefaultCommonPassable.components,
	elements: defaultCommonElements,
	texts: reactDefaultCommonPassable.texts,
	functions: reactDefaultCommonPassable.functions,
	hooks: defaultCommonHooks,
};
