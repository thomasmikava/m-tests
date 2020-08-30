import { EditContentCont } from "./contexts";
import { ContentPath } from "m-tests-core/lib/utils/path";
import { useOptimizedFunc } from "../../../../utils/hooks";
import { SetState } from "../../../../utils/interfaces";
import { IStatement } from "m-tests-core/lib/questions/common-schemas";
import {
	getAbsoluteProperty,
	getUpdatedAbsoluteProperty,
} from "../../../../utils/prop";

const useContentType = () =>
	EditContentCont.useSelector(x => x.content.type, []);

const useContentSetter = () => EditContentCont.useSelector(x => x.onChange, []);

const useContentGetterFn = () =>
	EditContentCont.useSelector(x => x.getContent, []);

const useExplanation = () =>
	EditContentCont.useSelector(x => x.content.explanation, []);

const useContent = () => EditContentCont.useSelector(x => x.content, []);
const useContentPathValueSetter = (path: ContentPath): SetState<IStatement> => {
	const updateContent = useContentSetter();
	return useOptimizedFunc(vl => {
		updateContent(x => {
			const currentValue: IStatement = getAbsoluteProperty(
				x,
				path.relativePath
			);
			const fn = typeof vl === "function" ? vl : currentValue => vl;
			const newValue = fn(currentValue);
			return getUpdatedAbsoluteProperty(x, path.relativePath, newValue);
		});
	});
};

export const commonEditHooks = {
	useContent,
	useContentType,
	useExplanation,
	useContentSetter,
	useContentPathValueSetter,
	useContentGetterFn,
};
