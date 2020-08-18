import FillingBlanks from "./filling-blanks/class";
import MultipleChoice from "./multiple-choice/class";
import MultipleContents from "./multiple-contents/class";
import SortItems from "./sort-items/class";
import { IRawQuestionContent, IQuestionContent } from "./schemas";
import { ContentType } from "./common-schemas";

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
