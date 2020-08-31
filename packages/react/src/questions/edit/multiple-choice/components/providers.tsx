import React from "react";
import { CounterComponent } from "../../../view/a";
import { MCEditComps, MCEdit, MCEditTexts, MCEditHooks } from ".";
import {
	MultipleChoiceEditContainerProps,
	MCEditBodyProps,
	MCEditStatementProps,
	MCEditChoicesProps,
	MCEditSingleChoiceProps,
	MCEditSingleChoiceDecorationProps,
	MCEditAddChoiceButtonProps,
	MCEditHeadProps,
	MCEditTailProps,
} from "./types";
import { MCEditGetterHooks, ConnectWithEditingChoice } from "../hooks";
import { commonEditHooks } from "../../common/hooks";
import { CommonEditCusto } from "../../common/components";
import { IMultipleChoiceContent } from "m-tests-core/lib/questions/multiple-choice/types";

export const MultipleChoiceEditContainer: React.FC<MultipleChoiceEditContainerProps> = React.memo(
	({ path }) => {
		return (
			<MCEdit.elements.Container>
				<CounterComponent title={"MultipleChoiceEditNewContainer"} />
				<MCEditComps.Head path={path} />
				<MCEditComps.Body path={path} />
				<MCEditComps.Tail path={path} />
			</MCEdit.elements.Container>
		);
	}
);

export const MCEditBody: React.FC<MCEditBodyProps> = React.memo(({ path }) => {
	return (
		<MCEdit.elements.BodyContainer>
			<MCEditComps.statement.Container path={path.add("statement")} />
			<MCEditComps.choices.Container path={path.add("choices")} />
			<MCEditComps.explanation.Container path={path.add("explanation")} />
		</MCEdit.elements.BodyContainer>
	);
});

export const MCEditHead: React.FC<MCEditHeadProps> = React.memo(({ path }) => {
	const Checkbox = CommonEditCusto.components.CheckboxWithLabel;
	const {
		canSelectMultiple,
		allowPartialCredit,
	} = MCEditGetterHooks.settings.use();
	const handleCanSelectMultipleChange = MCEditHooks.settings.canSelectMultipleChangeFn.use();
	const handleAllowPartialCreditChange = MCEditHooks.settings.allowPartialCreditChangeFn.use();
	return (
		<MCEdit.elements.HeadContainer>
			<Checkbox
				value={!!canSelectMultiple}
				onChange={handleCanSelectMultipleChange}
				label={<MCEditTexts.CanSelectMultiple />}
			/>
			{canSelectMultiple && (
				<Checkbox
					value={!!allowPartialCredit}
					onChange={handleAllowPartialCreditChange}
					label={<MCEditTexts.AllowPartialCredit />}
				/>
			)}
		</MCEdit.elements.HeadContainer>
	);
});

export const MCEditTail: React.FC<MCEditTailProps> = React.memo(({ path }) => {
	const Checkbox = CommonEditCusto.components.CheckboxWithLabel;
	const { disableShuffle } = MCEditGetterHooks.settings.use();
	const handleDisableShuffleChange = MCEditHooks.settings.disableShuffleChangeFn.use();
	return (
		<MCEdit.elements.TailContainer>
			<Checkbox
				value={!!disableShuffle}
				onChange={handleDisableShuffleChange}
				label={<MCEditTexts.DisableShuffle />}
			/>
		</MCEdit.elements.TailContainer>
	);
});

export const MCEditStatement: React.FC<MCEditStatementProps> = React.memo(
	({ path }) => {
		const statement = MCEditGetterHooks.statement.use();
		const Text = MCEdit.components.statement.Text;
		const Container = MCEdit.elements.statement.Container;
		const handleChange = commonEditHooks.useContentPathValueSetter(path);
		return (
			<Container>
				<Text
					path={path.add("text")}
					stat={statement}
					onChange={handleChange}
					usePlaceholder={MCEdit.texts.statement.Placeholder}
				/>
			</Container>
		);
	}
);

export const MCEditChoices: React.FC<MCEditChoicesProps> = React.memo(
	({ path }) => {
		const choiceIds = MCEditGetterHooks.allChoiceIds.use();
		const {
			AddChoice,
			single: { Container: ChoiceContainer },
		} = MCEdit.components.choices;
		const handleNewChoice = MCEditHooks.choices.addEmptyChoiceFn.use();
		return (
			<MCEdit.elements.choices.Container>
				<CounterComponent title="MCChoices I" />
				{choiceIds.map((choideId, index) => (
					<ChoiceContainer
						key={choideId}
						path={path.add(index)}
						id={choideId}
						index={index}
					/>
				))}
				<AddChoice onClick={handleNewChoice} />
			</MCEdit.elements.choices.Container>
		);
	}
);

export const MCEditSingleChoice: React.FC<MCEditSingleChoiceProps> = React.memo(
	ConnectWithEditingChoice(
		({
			path,
			choice,
		}: MCEditSingleChoiceProps & {
			choice: IMultipleChoiceContent["choices"][number];
		}) => {
			const handleChange = commonEditHooks.useContentPathValueSetter(
				path
			);

			const { Container, TextContainer } = MCEdit.elements.choices.single;
			const {
				LeftDecoration: Decoration,
				RightDecoration,
				Text,
			} = MCEdit.components.choices.single;

			return (
				<Container>
					<Decoration path={path} dir="left" />
					<TextContainer>
						<Text
							stat={choice}
							path={path.add("text")}
							onChange={handleChange}
							usePlaceholder={
								MCEdit.texts.choices.single.Placeholder
							}
						/>
					</TextContainer>
					<RightDecoration path={path} dir="right" />
				</Container>
			);
		}
	)
);

export const MCEditAddChoiceButton: React.FC<MCEditAddChoiceButtonProps> = React.memo(
	({ onClick }) => {
		const Button = MCEdit.elements.choices.Button;
		const AddChoiceText = MCEdit.texts.choices.AddChoice;
		return (
			<Button onClick={onClick}>
				<AddChoiceText />
			</Button>
		);
	}
);

export const MCEditSingleChoiceDecoration: React.FC<MCEditSingleChoiceDecorationProps> = React.memo(
	({ dir }) => {
		const { DecorationContainer, Icon } = MCEdit.elements.choices.single[
			dir
		];
		const choiceId = MCEditGetterHooks.choiceId.use();
		const onChoose = MCEditHooks.choices.chooseFn.use(choiceId);
		const onDelete = MCEditHooks.choices.deleteFn.use(choiceId);
		return (
			<DecorationContainer onClick={dir === "left" ? onChoose : onDelete}>
				<Icon />
			</DecorationContainer>
		);
	}
);
