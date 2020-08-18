import { covertASCIIMathToLaTex } from "@tests-core/components/editor/math";
import { ContentType } from "@tests-core/schemas/questions/contnets/common-schemas";
import { FBContentDesignStructure } from "@tests-core/schemas/questions/contnets/filling-blanks/schema";
import { normalizeHTML } from "new-tests/components/editor/html";
import {
	Explanation,
	TextComponent,
} from "new-tests/components/questions/view/common/components/providers";
import React from "react";
import {
	CommonEditComponents,
	CommonEditElements,
	CommonEditFunctions,
	CommonEditTexts,
	CommonEditPassable,
} from "./types";
import { pckgDefComponents } from "new-tests/utils/shortcuts";
import { CreateCusto } from "custo";

const defaultCommonEditComponents: CommonEditComponents = {
	text: CreateCusto.hookOf.Component(() =>
		pckgDefComponents.newComp(TextComponent)
	),
	explanation: {
		container: pckgDefComponents.newComp(Explanation),
	},
};

const defaultCommonEditElements: CommonEditElements = {
	outerContainer: pckgDefComponents.newDivEl({
		style: { fontFamily: "FiraGO", border: "2px solid red" },
	}),
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

const defaultCommonEditFunctions: CommonEditFunctions = {
	useContentTextTransformer: CreateCusto.hookOf.Data(
		defaultContentTextTransformer
	),
};

const defaultCommonEditTexts: CommonEditTexts = {
	explanation: {
		title: CreateCusto.Text("Explanation"),
	},
	contentTypes: CreateCusto.hookOf.Data(() => [
		{
			value: {
				contentType: ContentType.MultipleChoice,
				designStructure: null,
			},
			label: "Multiple Choice",
		},
		{
			value: {
				contentType: ContentType.SortItems,
				designStructure: null,
			},
			label: "Sorting Items",
		},
		{
			value: {
				contentType: ContentType.FillingBlanks,
				designStructure: null,
			},
			label: "Filling Blanks",
		},
		{
			value: {
				contentType: ContentType.MultipleContents,
				designStructure: null,
			},
			label: "Multiple Contents",
		},
		{
			value: {
				contentType: ContentType.FillingBlanks,
				designStructure: FBContentDesignStructure.essay,
			},
			label: "Essay",
		},
		{
			value: {
				contentType: ContentType.FillingBlanks,
				designStructure: FBContentDesignStructure.essayWithFiles,
			},
			label: "Essay With Files",
		},
	]),
};

export const defaultCommonEdit: CommonEditPassable = {
	components: defaultCommonEditComponents,
	elements: defaultCommonEditElements,
	texts: defaultCommonEditTexts,
	functions: defaultCommonEditFunctions,
};
