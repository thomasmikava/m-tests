import { MCEditContentCont, MCEditChoiceCont } from "./contexts";
import { pickKeys, removeKeys } from "m-tests-core/lib/utils/objects";
import { areDeeplyEqual } from "m-tests-core/lib/utils/optimizations";
import { useOptimizedFunc } from "../../../../utils/hooks";
import { commonEditHooks } from "../../common/hooks";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { getUniqueId } from "../../../../utils/array";
import { newContent } from "m-tests-core/lib/questions/new-content";
import { CommonEditCusto } from "../../common/components";
import { IRMultipleChoiceContent } from "m-tests-core/lib/questions/multiple-choice/types";

const useStatement = () =>
	MCEditContentCont.useSelector(content => content.statement, []);

const useChoices = () =>
	MCEditContentCont.useSelector(content => content.choices, []);

const useChoicesCount = () =>
    MCEditContentCont.useSelector(content => content.choices.length, []);

const useChoiceId = () => MCEditChoiceCont.useProperty("id");

const useIsCurrentChoiceCorrect = () => MCEditChoiceCont.useSelector(choice => typeof choice.score === "number" && choice.score > 0, []);


const useSettings = () =>
    MCEditContentCont.useSelector(
		content =>
			pickKeys(
				content,
				"allowPartialCredit",
				"canSelectMultiple",
				"designStructure",
				"disableShuffle"
			),
		areDeeplyEqual,
		[]
	);

const useChoiceOnClick = (choiceId: number) => {
	const { canSelectMultiple } = useSettings();
	const setContent = commonEditHooks.useContentSetter();
	return useOptimizedFunc(() => {
		setContent((content) => {
			if (content.type !== ContentType.MultipleChoice) return content;
			return {
				...content,
				choices: content.choices.map((choice) => {
					const isCurrentChoice = choice.id === choiceId;
					if (!isCurrentChoice) {
						if (canSelectMultiple) return choice;
						if (typeof choice.score === "number") {
							return removeKeys(choice, "score");
						}
						return choice;
					}
					if (typeof choice.score === "number" && choice.score > 0) {
						return removeKeys(choice, "score");
					}
					return { ...choice, score: 1 };
				})
			}
		});
	});
};

const useChoiceDeleteHandler = (choiceId: number) => {
	const setContent = commonEditHooks.useContentSetter();
	return useOptimizedFunc(() => {
		setContent(content => {
			if (content.type !== ContentType.MultipleChoice) return content;
			return {
				...content,
				choices: content.choices.filter(e => e.id !== choiceId),
			}
		})
	});
}

const useAddEmptyChoiceFn = () => {
	const setContent = commonEditHooks.useContentSetter();
	const getNewText = CommonEditCusto.functions.getEmptyText.use();
	return useOptimizedFunc(() => {
		setContent((content) => {
			if (content.type !== ContentType.MultipleChoice) return content;
			const usedIds = newContent(content).getUsedIds();
			const [newId] = getUniqueId(usedIds);
			return {
				...content,
				choices: [...content.choices, {
					id: newId,
					text: getNewText(),
				}]
			}
		});
	});
}

const useSetPropFn = <K extends keyof Pick<IRMultipleChoiceContent, "allowPartialCredit" | "disableShuffle">>(key: K) => {
	const setContent = commonEditHooks.useContentSetter();
	return useOptimizedFunc((value: IRMultipleChoiceContent[K]) => {
		setContent((content) => {
			if (content.type !== ContentType.MultipleChoice) return content;
			return {
				...content,
				[key]: value,
			}
		});
	});
}

const useCanSelectMultipleChangeFn = () => {
	const setContent = commonEditHooks.useContentSetter();
	return useOptimizedFunc((canSelectMultiple: boolean) => {
		setContent((content) => {
			if (content.type !== ContentType.MultipleChoice) return content;
			let hasFoundCorrectChoice = false;
			return {
				...content,
				canSelectMultiple,
				allowPartialCredit: canSelectMultiple ? content.allowPartialCredit : undefined,
				choices: canSelectMultiple ? content.choices : content.choices.map((choice) => {
					if (typeof choice.score === "number" && choice.score > 0) {
						if (!hasFoundCorrectChoice) {
							hasFoundCorrectChoice = true;
							return choice;
						} else {
							return removeKeys(choice, "score");
						}
					}
					return choice;
				}),
			};
		});
	});
}

export const mcEditHooks = {
    useStatement,
    useChoices,
    useChoicesCount,
    useChoiceId,
    useIsCurrentChoiceCorrect,
    useSettings,
	useChoiceOnClick,
	useAddEmptyChoiceFn,
	useChoiceDeleteHandler,
	useSetPropFn,
	useCanSelectMultipleChangeFn,
};
