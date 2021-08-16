import FillingBlanks from "./filling-blanks/class";
import MultipleChoice from "./multiple-choice/class";
import MultipleContents from "./multiple-contents/class";
import SortItems from "./sort-items/class";
import { IRawQuestionContent, IQuestionContent } from "./schemas";
import { ContentType, EmptyContentCreationSettings } from "./common-schemas";
import GroupingItems from "./grouping-items/class";

export function newContent(content: IRawQuestionContent): IQuestionContent {
	switch (content.type) {
		case ContentType.MultipleChoice:
			return new MultipleChoice(content);
		case ContentType.SortItems:
			return new SortItems(content);
		case ContentType.FillingBlanks:
			return new FillingBlanks(content);
		case ContentType.MultipleContents:
			return new MultipleContents(content);
		default:
			throw new Error(
				"Unsupported content type: " + (content as any).type
			);
	}
}

export const getEmptyContent = (settings: EmptyContentCreationSettings) => {
	switch (settings.contentType) {
		case ContentType.MultipleChoice:
			return MultipleChoice.getEmptyContent(settings);
		case ContentType.FillingBlanks:
			return FillingBlanks.getEmptyContent(settings);
		case ContentType.SortItems:
			return SortItems.getEmptyContent();
		case ContentType.GroupingItems:
			return GroupingItems.getEmptyContent();
		case ContentType.MultipleContents:
			return MultipleContents.getEmptyContent();
		default:
			throw new Error(`content type ${settings.contentType} is not supported`);
	}
};
