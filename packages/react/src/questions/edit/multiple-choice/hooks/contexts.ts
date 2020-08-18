import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import { DynamicContext } from "react-flexible-contexts";

type IContent = IRawQuestionContent;

export const MCEditContentCont = DynamicContext.create<IContent>();
