/* eslint-disable react-hooks/rules-of-hooks */
import { pckgDefComponents } from "m-tests-react/lib/utils/shortcuts";
import React from "react";
import { normalizeHTML } from "../../../editor/html";
import { covertASCIIMathToLaTex } from "../../../editor/math";
import {
	Explanation,
	TextComponent,
} from "m-tests-react/lib/questions/view/common/components/providers";
import {
	CommonComponents,
	CommonElements,
	CommonFunctions,
	CommonTexts,
	CommonPassable,
} from "m-tests-react/lib/questions/view/common/props/types";
import { CreateCusto } from "custo";

const defaultCommonComponents: CommonComponents = {
	text: pckgDefComponents.newComp(TextComponent),
	explanation: {
		container: pckgDefComponents.newComp(Explanation),
	},
};

const empty = pckgDefComponents.newDivEl();

const defaultCommonElements: CommonElements = {
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

const defaultCommonFunctions: CommonFunctions = {
	useContentTextTransformer: CreateCusto.Hook(defaultContentTextTransformer),
	/* useNonContentTextTransformer: CreateCust.Hook(
		text => (text || "").toString() + "@@"
	), */
};

const defaultCommonTexts: CommonTexts = {
	explanation: {
		title: CreateCusto.Text("Explanation"),
	},
};

export const defaultCommonPasable: CommonPassable = {
	components: defaultCommonComponents,
	elements: defaultCommonElements,
	functions: defaultCommonFunctions,
	texts: defaultCommonTexts,
};
