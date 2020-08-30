import React from "react";
import { CounterComponent } from "../../../view/a";
import { MCEditComps, MCEdit, MCEditTexts } from ".";
import { MultipleChoiceEditContainerProps, MCEditBodyProps, MCEditStatementProps, MCEditChoicesProps, MCEditSingleChoiceProps, MCEditSingleChoiceDecorationProps, MCEditAddChoiceButtonProps, MCEditHeadProps, MCEditTailProps } from "./types";
import { mcEditHooks, ConnectWithEditingChoice } from "../hooks";
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
	return <MCEdit.elements.BodyContainer>
		<MCEditComps.statement.Container path={path.add("statement")} />
		<MCEditComps.choices.Container path={path.add("choices")} />
		<MCEditComps.explanation.Container path={path.add("explanation")} />
	</MCEdit.elements.BodyContainer>;
});

export const MCEditHead: React.FC<MCEditHeadProps> = React.memo(({ path }) => {
	const Checkbox = CommonEditCusto.components.CheckboxWithLabel;
	const { canSelectMultiple, allowPartialCredit } = mcEditHooks.useSettings();
	const handleCanSelectMultipleChange = mcEditHooks.useCanSelectMultipleChangeFn();
	const handleAllowPartialCreditChange = mcEditHooks.useSetPropFn("allowPartialCredit");
	return <MCEdit.elements.HeadContainer>
		<Checkbox value={!!canSelectMultiple} onChange={handleCanSelectMultipleChange} label={<MCEditTexts.CanSelectMultiple />} />
		{canSelectMultiple && <Checkbox value={!!allowPartialCredit} onChange={handleAllowPartialCreditChange} label={<MCEditTexts.AllowPartialCredit />} />}
	</MCEdit.elements.HeadContainer>;
});

export const MCEditTail: React.FC<MCEditTailProps> = React.memo(({ path }) => {
	const Checkbox = CommonEditCusto.components.CheckboxWithLabel;
	const { disableShuffle } = mcEditHooks.useSettings();
	const handleDisableShuffleChange = mcEditHooks.useSetPropFn("disableShuffle");
	return <MCEdit.elements.TailContainer>
		<Checkbox value={!!disableShuffle} onChange={handleDisableShuffleChange} label={<MCEditTexts.DisableShuffle />} />
	</MCEdit.elements.TailContainer>;
});

export const MCEditStatement: React.FC<MCEditStatementProps> = React.memo(({ path }) => {
	const statement = mcEditHooks.useStatement();
	const Text = MCEdit.components.statement.Text;
	const Container = MCEdit.elements.statement.Container;
	const handleChange = commonEditHooks.useContentPathValueSetter(path);
	return (
		<Container>
			<Text
				path={path.add("text")}
				stat={statement}
				onChange={handleChange}
				usePlaceholder={MCEdit.texts.statement.placeholder}
			/>
		</Container>
	);
});

export const MCEditChoices: React.FC<MCEditChoicesProps> = React.memo(({ path }) => {
	const choicesCount = mcEditHooks.useChoicesCount();
	const {AddChoice, single: { Container: ChoiceContainer }} = MCEdit.components.choices;
	const handleNewChoice = mcEditHooks.useAddEmptyChoiceFn();
	return (
		<MCEdit.elements.choices.Container>
			<CounterComponent title="MCChoices I" />
			{new Array(choicesCount).fill(0).map((_, index) => (
				<ChoiceContainer key={index} choiceIndex={index} path={path.add(index)} />
			))}
			<AddChoice onClick={handleNewChoice} />
		</MCEdit.elements.choices.Container>
	);
});

export const MCEditSingleChoice: React.FC<MCEditSingleChoiceProps> = React.memo(
	ConnectWithEditingChoice(({ path, choice }: MCEditSingleChoiceProps & { choice: IMultipleChoiceContent["choices"][number] }) => {
		const handleChange = commonEditHooks.useContentPathValueSetter(path);

		const { Container, TextContainer } = MCEdit.elements.choices.single;
		const { LeftDecoration: Decoration, RightDecoration, Text } = MCEdit.components.choices.single;

		return (
			<Container>
					<Decoration path={path} dir="left" />
					<TextContainer>
						<Text
							stat={choice}
							path={path.add("text")}
							onChange={handleChange}
							usePlaceholder={MCEdit.texts.choices.single.placeholder}
						/>
					</TextContainer>
					<RightDecoration path={path} dir="right" />
			</Container>
		);
	})
);

export const MCEditAddChoiceButton: React.FC<MCEditAddChoiceButtonProps> = React.memo(({ onClick }) => {
	const Button = MCEdit.elements.choices.Button;
	const AddChoiceText = MCEdit.texts.choices.AddChoice;
	return <Button onClick={onClick}><AddChoiceText /></Button>;
});

export const MCEditSingleChoiceDecoration: React.FC<MCEditSingleChoiceDecorationProps> = React.memo(
	({ dir }) => {
		const { DecorationContainer, Icon } = MCEdit.elements.choices.single[dir];
		const onClick = mcEditHooks.useChoiceOnClick(mcEditHooks.useChoiceId());
		return (
			<DecorationContainer onClick={onClick}>
				<Icon />
			</DecorationContainer>
		);
	}
);
