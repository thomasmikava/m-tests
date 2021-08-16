import { IUserAnswer } from "../user-answer";
import {
	ContentType,
	ICommonQuestionParts,
	ITextStatement,
} from "../common-schemas";
import { IRawQuestionContent, IRQuestionContent } from "../schemas";

export interface IMultipleContents extends ICommonQuestionParts {
	type: ContentType.MultipleContents;
	items: {
		id: number;
		content: IRawQuestionContent | Omit<ITextStatement, "id">;
		settings?: {
			nextContentOnSamePage?: boolean;
		};
	}[];
	restrictViewingPagesBeforehand?: boolean;
}

export type IRMultipleContents = Omit<
	ICommonQuestionParts & {
		type: ContentType.MultipleContents;
		items: {
			id: number;
			content: IRQuestionContent | Omit<ITextStatement, "id">;
			settings?: {
				nextContentOnSamePage?: boolean;
			};
		}[];
		restrictViewingPagesBeforehand?: boolean;
	},
	"explanation"
>;

export type IMultipleContentsUserAns = {
	[contentId: number]: IUserAnswer | null | undefined;
} | null;

export interface StrictMultipleContentsEmptyContentSettings {
}
