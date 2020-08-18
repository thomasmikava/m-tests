import { IRawQuestionContent } from "@tests-core/schemas/questions/contnets/schemas";
import { DynamicContext } from "react-flexible-contexts";

type IContent = IRawQuestionContent;

export const MCEditContentCont = DynamicContext.create<IContent>();
