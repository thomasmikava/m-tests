import {
	IMultipleChoiceContent,
	IRMultipleChoiceContent,
} from "@tests-core/schemas/questions/contnets/multiple-choice/schema";
import { DynamicContext } from "react-flexible-contexts";

type IContent = IRMultipleChoiceContent | IMultipleChoiceContent;

export const MCContentCont = DynamicContext.create<IContent>();

export const MCChoiceCont = DynamicContext.create<
	| IRMultipleChoiceContent["choices"][number]
	| IMultipleChoiceContent["choices"][number]
>();
