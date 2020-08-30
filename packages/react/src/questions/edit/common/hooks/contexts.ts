import { DynamicContext } from "react-flexible-contexts";
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import { SetState } from "../../../../utils/interfaces";

export const EditContentCont = DynamicContext.createDestructured<{
	content: IRawQuestionContent;
	onChange: SetState<IRawQuestionContent>;
	getContent: () => IRawQuestionContent;
}>();
EditContentCont.setContextName("EditContent");
