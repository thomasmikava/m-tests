import { CommonEditPassable } from "../props/types";
import { CreateCusto } from "custo";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { FBContentDesignStructure } from "m-tests-core/lib/questions/filling-blanks/types";
import { ToVeryGeneralCusto } from "custo/lib/utils/prop-generics";

export const reactDefaultCommonEditPassable: ToVeryGeneralCusto<Pick<
	CommonEditPassable,
	"texts" | "functions" | "hooks"
>> = {
	texts: {
		explanation: {
			Title: CreateCusto.Text("Explanation"),
			Placeholder: CreateCusto.Data("Explanation"),
		},
		contentTypes: {
			Placeholder: CreateCusto.Data("Choose content type"),
			options: CreateCusto.Data([
				{
					value: {
						contentType: ContentType.MultipleChoice,
					},
					label: "Multiple Choice",
				},
				{
					value: {
						contentType: ContentType.SortItems,
					},
					label: "Sorting Items",
				},
				{
					value: {
						contentType: ContentType.FillingBlanks,
					},
					label: "Filling Blanks",
				},
				{
					value: {
						contentType: ContentType.MultipleContents,
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
						designStructure:
							FBContentDesignStructure.essayWithFiles,
					},
					label: "Essay With Files",
				},
			]),
		},
	},
	functions: {
		getEmptyText: () => "",
	},
	hooks: {},
};
