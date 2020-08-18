import { covertASCIIMathToLaTex } from "../../../editor/math";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { FBContentDesignStructure } from "m-tests-core/lib/questions/filling-blanks/types";
import { normalizeHTML } from "../../../editor/html";
import {
	Explanation,
	TextComponent,
} from "m-tests-react/lib/questions/view/common/components/providers";
import React from "react";
import {
	CommonEditComponents,
	CommonEditElements,
	CommonEditFunctions,
	CommonEditTexts,
	CommonEditPassable,
} from "m-tests-react/lib/questions/edit/common/props/types";
import { pckgDefComponents } from "m-tests-react/lib/utils/shortcuts";
import { CreateCusto } from "custo";
import { ChooseQuestionContentType } from "./providers";

const defaultCommonEditComponents: CommonEditComponents = {
	text: CreateCusto.hookOf.Component(() =>
		pckgDefComponents.newComp(TextComponent)
	),
	explanation: {
		container: pckgDefComponents.newComp(Explanation),
	},
	contentSelector: pckgDefComponents.newComp(ChooseQuestionContentType),
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
