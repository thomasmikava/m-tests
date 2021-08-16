import { ContentType, EmptyContentCreationSettings } from "m-tests-core/lib/questions/common-schemas";
import { getEmptyContent } from "m-tests-core/lib/questions/new-content";
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import { GetChangedContentFn } from "../common/props/types";

export type GetEmptyContentFn = (settings: EmptyContentCreationSettings) => IRawQuestionContent;

export const createDefaultGetChangedContentFn = ({ getEmptyContent }: {
	getEmptyContent: GetEmptyContentFn
}): GetChangedContentFn => {
	return ({
		oldContent,
		newContentSettings,
	}: {
		oldContent?: IRawQuestionContent;
		newContentSettings: EmptyContentCreationSettings;
	}): IRawQuestionContent | undefined => {
		if (!oldContent) {
			return getEmptyContent(newContentSettings);
		}
		if (oldContent.type === ContentType.MultipleContents) {
			const innerItem = oldContent.items.find(
				e => e.content.type === newContentSettings.contentType // FIXME: what if other settings are not
			);
			if (innerItem) {
				return innerItem.content as IRawQuestionContent;
			}
		}
		return getEmptyContent(newContentSettings);
	};
}

export const getChangedContent = createDefaultGetChangedContentFn({
	getEmptyContent
});
