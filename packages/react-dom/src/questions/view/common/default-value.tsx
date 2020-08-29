/* eslint-disable react-hooks/rules-of-hooks */
import { pckgDefComponents } from "m-tests-react/lib/utils/shortcuts";
import React from "react";
import { normalizeHTML } from "../../../editor/html";
import { covertASCIIMathToLaTex } from "../../../editor/math";
import { reactDefaultCommonPassable } from "m-tests-react/lib/questions/view/common/components/value";
import {
	CommonPassable,
} from "m-tests-react/lib/questions/view/common/props/types";
import { CreateCusto } from "custo";

const empty = pckgDefComponents.newDivEl();

const defaultCommonElements: CommonPassable["elements"] = {
	outerContainer: empty,
	bodyContainer: empty,
	innerContainers: pckgDefComponents.newDivEl({
		style: {
			fontFamily: "FiraGO",
			background: "rgba(0,0,0,0.2)",
			borderRadius: 20,
		},
	}),
	text: empty,
	explanation: {
		title: empty,
		body: empty,
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
