import { MCEditContentCont, MCEditChoiceCont } from "./contexts";
import { pickKeys, removeKeys } from "m-tests-core/lib/utils/objects";
import { areDeeplyEqual } from "m-tests-core/lib/utils/optimizations";
import { useOptimizedFunc } from "../../../../utils/hooks";
import { commonEditHooks } from "../../common/hooks";
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { generateUniqueId } from "../../../../utils/array";
import { newContent } from "m-tests-core/lib/questions/new-content";
import { CommonEditCusto } from "../../common/components";
import { IRMultipleChoiceContent } from "m-tests-core/lib/questions/multiple-choice/types";
import { CreateHookInjection } from "custo/lib/components/wrappers";
import React, { useLayoutEffect } from "react";
import { MCEdit } from "../components";
import { MCEditPassable } from "../props/types";
import { DeeplyRequired } from "custo/lib/utils/generics";
import { toCustHooks } from "custo/lib/classes/helper-fns/transformations";
import { MCEditSingleChoiceProps } from "../components/types";

const useStatement = () =>
	MCEditContentCont.useSelector(content => content.statement, []);

const useChoices = () =>
	MCEditContentCont.useSelector(content => content.choices, []);

const useChoicesCount = () =>
	MCEditContentCont.useSelector(
		content => {
			return content.choices.length;
		},
		[],
		"useChoicesCount"
	);

const useAllChoiceIds = () =>
	MCEditContentCont.useSelector(
		content => content.choices.map(e => e.id),
		areDeeplyEqual,
		[],
		"useAllChoiceIds"
	);

const useChoiceId = () => MCEditChoiceCont.useProperty("id");

const useIsCurrentChoiceCorrect = () =>
	MCEditChoiceCont.useSelector(
		choice => typeof choice.score === "number" && choice.score > 0,
		[]
	);

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
		setContent(content => {
			if (content.type !== ContentType.MultipleChoice) return content;
			return {
				...content,
				choices: content.choices.map(choice => {
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
				}),
			};
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
			};
		});
	});
};

const useAddEmptyChoiceFn = () => {
	const setContent = commonEditHooks.useContentSetter();
	const getNewText = CommonEditCusto.functions.getEmptyText.use();
	return useOptimizedFunc(() => {
		setContent(content => {
			if (content.type !== ContentType.MultipleChoice) return content;
			const usedIds = newContent(content).getUsedIds();
			const newId = generateUniqueId(usedIds);
			return {
				...content,
				choices: [
					...content.choices,
					{
						id: newId,
						text: getNewText(),
					},
				],
			};
		});
	});
};

const useSetPropFn = <
	K extends keyof Pick<
		IRMultipleChoiceContent,
		"allowPartialCredit" | "disableShuffle"
	>
>(
	key: K
) => {
	const setContent = commonEditHooks.useContentSetter();
	return useOptimizedFunc((value: IRMultipleChoiceContent[K]) => {
		setContent(content => {
			if (content.type !== ContentType.MultipleChoice) return content;
			return {
				...content,
				[key]: value,
			};
		});
	});
};

const useCanSelectMultipleChangeFn = () => {
	const setContent = commonEditHooks.useContentSetter();
	return useOptimizedFunc((canSelectMultiple: boolean) => {
		setContent(content => {
			if (content.type !== ContentType.MultipleChoice) return content;
			let hasFoundCorrectChoice = false;
			return {
				...content,
				canSelectMultiple,
				allowPartialCredit: canSelectMultiple
					? content.allowPartialCredit
					: undefined,
				choices: canSelectMultiple
					? content.choices
					: content.choices.map(choice => {
							if (
								typeof choice.score === "number" &&
								choice.score > 0
							) {
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
};

export const MCEditGetterHooks = toCustHooks({
	statement: useStatement,
	choices: useChoices,
	choicesCount: useChoicesCount,
	allChoiceIds: useAllChoiceIds,
	choiceId: useChoiceId,
	settings: useSettings,
});

export const mcDefaultEditHooks: DeeplyRequired<MCEditPassable["hooks"]> = toCustHooks(
	{
		choices: {
			isCurrentChoiceCorrect: useIsCurrentChoiceCorrect,
			chooseFn: useChoiceOnClick,
			deleteFn: useChoiceDeleteHandler,
			addEmptyChoiceFn: useAddEmptyChoiceFn,
		},
		settings: {
			canSelectMultipleChangeFn: useCanSelectMultipleChangeFn,
			allowPartialCreditChangeFn: () =>
				useSetPropFn("allowPartialCredit"),
			disableShuffleChangeFn: () => useSetPropFn("disableShuffle"),
		},
	}
);

const getMCHooks = () => MCEdit.hooks;

export const ConnectWithEditingChoice = CreateHookInjection(
	({ index, id }: Pick<MCEditSingleChoiceProps, "id" | "index">) => {
		return {
			choice: MCEditContentCont.useSelector(
				x => {
					const choice = x.choices[index];
					if (!choice) {
						throw new Error(`choice not found for index ${index}`);
					}
					return choice;
				},
				[index],
				"useChoiceByIndex"
			),
		};
	},
	props => (
		<MCEditChoiceCont.Provider value={props.choice}>
			{props.children}
		</MCEditChoiceCont.Provider>
	)
);
