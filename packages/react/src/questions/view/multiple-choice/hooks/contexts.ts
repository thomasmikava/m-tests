import {
	IMultipleChoiceContent,
	IRMultipleChoiceContent,
} from "m-tests-core/lib/questions/multiple-choice/types";
import { DynamicContext } from "react-flexible-contexts";

type IContent = IRMultipleChoiceContent | IMultipleChoiceContent;

export const MCContentCont = DynamicContext.create<IContent>();

export const MCChoiceCont = DynamicContext.create<
	| IRMultipleChoiceContent["choices"][number]
	| IMultipleChoiceContent["choices"][number]
>();
