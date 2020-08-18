import { IFillingBlanksUserAns } from "./filling-blanks/types";
import { IMultipleChoiceUserAns } from "./multiple-choice/types";
import { IMultipleContentsUserAns } from "./multiple-contents/types";
import { ISortItemsUserAns } from "./sort-items/types";

export type IUserAnswer =
	| IFillingBlanksUserAns
	| IMultipleChoiceUserAns
	| ISortItemsUserAns
	| IMultipleContentsUserAns;
