import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { IMultipleContents } from "m-tests-core/lib/questions/multiple-contents/types";
import {
	RawContentToEditableContentFn,
	EditableContentToRawContentFn,
} from "./props/types";
import { newContent } from "m-tests-core/lib/questions/new-content";
import { generateUniqueId } from "../../../utils/array";

export const createMapContent = (
	contentMapFn: (content: IRawQuestionContent) => any
): ((content: IRawQuestionContent) => IRawQuestionContent) => {
	const helper = (content: IRawQuestionContent) => {
		const normalizedContent = { ...content };
		if (content.type === ContentType.MultipleContents) {
			if (normalizedContent.type === content.type) {
				normalizedContent.items = normalizedContent.items.map(
					<T extends IMultipleContents["items"][number]>(
						item: T
					): T => {
						if (item.content.type === ContentType.Text) return item;
						return {
							...item,
							content: helper(content),
						};
					}
				);
			}
		}
		return contentMapFn(normalizedContent);
	};
	return helper;
};

export const rawContentToEditableContent: RawContentToEditableContentFn = (
	content,
	helpers
): IRawQuestionContent => {
	return createMapContent(content => {
		const copiedContent = { ...content };
		copiedContent.explanation =
			content.explanation ||
			createExplanation(newContent(content).getUsedIds());
		return newContent(copiedContent).getMappedStatsContent(
			helpers.rawStatToEditableStatFn
		);
	})(content);
};

export const editableContentToRawContent: EditableContentToRawContentFn = (
	content,
	helpers
): IRawQuestionContent => {
	return createMapContent(content => {
		let copiedContent = { ...content };
		copiedContent = newContent(copiedContent).getMappedStatsContent(
			helpers.editableStatToRawStatFn
		);
		if (copiedContent.type === ContentType.MultipleChoice) {
			copiedContent = {
				...copiedContent,
				choices: copiedContent.choices.filter(
					e => e.score || e.text.length
				),
			};
		}

		if (copiedContent.explanation) {
			if (
				!copiedContent.explanation.text &&
				Object.keys(copiedContent.explanation).length === 2
			) {
				delete copiedContent.explanation;
			}
		}
		return copiedContent;
	})(content);
};

const createExplanation = (
	usedIds: number[]
): NonNullable<IRawQuestionContent["explanation"]> => {
	const id = generateUniqueId(usedIds);
	return {
		id,
		text: "",
	};
};
