import FillingBlanks from "./filling-blanks/class";
import GroupingItems from "./grouping-items/class";
import MultipleChoice from "./multiple-choice/class";
import MultipleContents from "./multiple-contents/class";
import SortItems from "./sort-items/class";
import {
	IFillingBlanksContent,
	IRFillingBlanksContent,
} from "./filling-blanks/types";
import {
	IGroupingItemsContent,
	IRGroupingItemsContent,
} from "./grouping-items/types";
import {
	IMultipleChoiceContent,
	IRMultipleChoiceContent,
} from "./multiple-choice/types";
import {
	IMultipleContents,
	IRMultipleContents,
} from "./multiple-contents/types";
import { IRSortItemsContent, ISortItemsContent } from "./sort-items/types";

export type IRawQuestionContent =
	| IMultipleChoiceContent
	| ISortItemsContent
	| IFillingBlanksContent
	| IGroupingItemsContent
	| IMultipleContents;

export type IRQuestionContent =
	| IRMultipleChoiceContent
	| IRSortItemsContent
	| IRFillingBlanksContent
	| IRGroupingItemsContent
	| IRMultipleContents;

export type IQuestionContent =
	| MultipleChoice
	| SortItems
	| FillingBlanks
	| GroupingItems
	| MultipleContents;
