import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import MultipleChoice from "m-tests-core/lib/questions/multiple-choice/class";
import { MCContentDesignStructure } from "m-tests-core/lib/questions/multiple-choice/types";
import FillingBlanks from "m-tests-core/lib/questions/filling-blanks/class";
import { FBContentDesignStructure } from "m-tests-core/lib/questions/filling-blanks/types";
import SortItems from "m-tests-core/lib/questions/sort-items/class";
import GroupingItems from "m-tests-core/lib/questions/grouping-items/class";
import MultipleContents from "m-tests-core/lib/questions/multiple-contents/class";
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";

export const getChangedContent = ({
	oldContent,
	newContentType,
	newDesignStructure,
}: {
	oldContent?: IRawQuestionContent;
	newContentType: ContentType;
	newDesignStructure: string | null;
}): IRawQuestionContent | undefined => {
	if (!oldContent) {
		return getEmptyContent(newContentType, newDesignStructure ?? null);
	}
	if (oldContent.type === ContentType.MultipleContents) {
		const innerItem = oldContent.items.find(
			e => e.content.type === newContentType
		);
		if (innerItem) {
			return innerItem.content as IRawQuestionContent;
		}
	}
	return getEmptyContent(newContentType, newDesignStructure ?? null);
};

export const getEmptyContent = (
	contentType: ContentType,
	designStructure: string | null
) => {
	switch (contentType) {
		case ContentType.MultipleChoice:
			return MultipleChoice.getEmptyContent(
				designStructure as MCContentDesignStructure
			);
		case ContentType.FillingBlanks:
			return FillingBlanks.getEmptyContent(
				designStructure as FBContentDesignStructure
			);
		case ContentType.SortItems:
			return SortItems.getEmptyContent();
		case ContentType.GroupingItems:
			return GroupingItems.getEmptyContent();
		case ContentType.MultipleContents:
			return MultipleContents.getEmptyContent();
		default:
			throw new Error(`content type ${contentType} is not supported`);
	}
};
