import { ContentType } from "@tests-core/schemas/questions/contnets/common-schemas";
import MultipleChoice from "@tests-core/components/questions/contents/multiple-choice/class";
import { MCContentDesignStructure } from "@tests-core/schemas/questions/contnets/multiple-choice/schema";
import FillingBlanks from "@tests-core/components/questions/contents/filling-blanks/class";
import { FBContentDesignStructure } from "@tests-core/schemas/questions/contnets/filling-blanks/schema";
import SortItems from "@tests-core/components/questions/contents/sort-items/class";
import GroupingItems from "@tests-core/components/questions/contents/grouping-items/class";
import MultipleContents from "@tests-core/components/questions/contents/multiple-contents/class";
import { IRawQuestionContent } from "@tests-core/schemas/questions/contnets/schemas";

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
