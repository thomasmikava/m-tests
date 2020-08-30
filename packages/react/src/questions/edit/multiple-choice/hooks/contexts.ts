import { DynamicContext } from "react-flexible-contexts";
import { IMultipleChoiceContent } from "m-tests-core/lib/questions/multiple-choice/types";
import { EditContentCont } from "../../common/hooks/contexts";

type IContent = IMultipleChoiceContent;

export const MCEditContentCont = EditContentCont.addInternalContext(x => x.content as IContent);

export const MCEditChoiceCont = DynamicContext.create<
	IContent["choices"][number]
>();
