import React from "react";
import { CounterComponent } from "../../../view/a";
import { MCEditContentCont, MCEditChoiceCont } from "../hooks/contexts";
import { MCEditComps, MCEdit, MCEditTexts } from ".";
import { MultipleChoiceEditContainerProps, MCEditBodyProps, MCEditStatementProps, MCEditChoicesProps, MCEditSingleChoiceProps, MCEditSingleChoiceDecorationProps, MCEditAddChoiceButtonProps, MCEditHeadProps, MCEditTailProps } from "./types";
import { mcEditHooks } from "../hooks";
import { commonEditHooks } from "../../common/hooks";
import { CommonEditCusto } from "../../common/components";

export const MultipleChoiceEditContainer: React.FC<MultipleChoiceEditContainerProps> = React.memo(
	({ path }) => {
		return (
			<MCEdit.elements.container>
				<CounterComponent title={"MultipleChoiceEditNewContainer"} />
				<MCEditComps.head path={path} />
				<MCEditComps.body path={path} />
				<MCEditComps.tail path={path} />
			</MCEdit.elements.container>
		);
	}
);

export const MCEditBody: React.FC<MCEditBodyProps> = React.memo(({ path }) => {
	return <MCEdit.elements.bodyContainer>
		<MCEditComps.statement.container path={path.add("statement")} />
		<MCEditComps.choices.container path={path.add("choices")} />
		<MCEditComps.explanation.container path={path.add("explanation")} />
	</MCEdit.elements.bodyContainer>;
});

export const MCEditHead: React.FC<MCEditHeadProps> = React.memo(({ path }) => {
	const Checkbox = CommonEditCusto.components.checkboxWithLabel;
	const { canSelectMultiple, allowPartialCredit } = mcEditHooks.useSettings();
	const handleCanSelectMultipleChange = mcEditHooks.useCanSelectMultipleChangeFn();
	const handleAllowPartialCreditChange = mcEditHooks.useSetPropFn("allowPartialCredit");
	return <MCEdit.elements.headContainer>
		<Checkbox value={!!canSelectMultiple} onChange={handleCanSelectMultipleChange} label={<MCEditTexts.canSelectMultiple />} />
		{canSelectMultiple && <Checkbox value={!!allowPartialCredit} onChange={handleAllowPartialCreditChange} label={<MCEditTexts.allowPartialCredit />} />}
	</MCEdit.elements.headContainer>;
});

export const MCEditTail: React.FC<MCEditTailProps> = React.memo(({ path }) => {
	const Checkbox = CommonEditCusto.components.checkboxWithLabel;
	const { disableShuffle } = mcEditHooks.useSettings();
	const handleDisableShuffleChange = mcEditHooks.useSetPropFn("disableShuffle");
	return <MCEdit.elements.tailContainer>
		<Checkbox value={!!disableShuffle} onChange={handleDisableShuffleChange} label={<MCEditTexts.disableShuffle />} />
	</MCEdit.elements.tailContainer>;
});

export const MCEditStatement: React.FC<MCEditStatementProps> = React.memo(({ path }) => {
	const statement = mcEditHooks.useStatement();
	const Text = MCEdit.components.statement.text;
	const Container = MCEdit.elements.statement.container;
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
	const AddChoice = MCEdit.components.choices.addChoice;
	const handleNewChoice = mcEditHooks.useAddEmptyChoiceFn();
	return (
		<MCEdit.elements.choices.container>
			<CounterComponent title="MCChoices I" />
			{new Array(choicesCount).fill(0).map((_, index) => (
				<MCEdit.components.choices.single.container key={index} choiceIndex={index} path={path.add(index)} />
			))}
			<AddChoice onClick={handleNewChoice} />
		</MCEdit.elements.choices.container>
	);
});

export const MCEditSingleChoice: React.FC<MCEditSingleChoiceProps> = React.memo(
	({ path, choiceIndex }) => {
		const choice = MCEditContentCont.useSelector(x => x.choices[choiceIndex], [choiceIndex]);

		const handleChange = commonEditHooks.useContentPathValueSetter(path);

		const Container = MCEdit.elements.choices.single.container;
		const Decoration = MCEdit.components.choices.single.decoration;
		const RightDecoration = MCEdit.components.choices.single.rightDecoration;
		const TextContainer = MCEdit.elements.choices.single.textContainer;
		const Text = MCEdit.components.choices.single.text;

		if (!choice) return null;

		return (
			<MCEditChoiceCont.Provider value={choice}>
				<Container>
						<Decoration path={path} />
						<TextContainer>
							<Text
								stat={choice}
								path={path.add("text")}
								onChange={handleChange}
								usePlaceholder={MCEdit.texts.choices.single.placeholder}
							/>
						</TextContainer>
						<RightDecoration path={path} />
				</Container>
			</MCEditChoiceCont.Provider>
		);
	}
);

export const MCEditAddChoiceButton: React.FC<MCEditAddChoiceButtonProps> = React.memo(({ onClick }) => {
	const Button = MCEdit.elements.choices.button;
	const AddChoiceText = MCEdit.texts.choices.addChoice;
	return <Button onClick={onClick}><AddChoiceText /></Button>;
});

export const MCEditSingleChoiceDecoration: React.FC<MCEditSingleChoiceDecorationProps> = React.memo(
	() => {
		const Cont = MCEdit.elements.choices.single.decorationContainer;
		const Icon = MCEdit.elements.choices.single.icon;
		const onClick = mcEditHooks.useChoiceOnClick(mcEditHooks.useChoiceId());
		return (
			<Cont onClick={onClick}>
				<Icon />
			</Cont>
		);
	}
);

export const MCEditSingleChoiceRightDecoration: React.FC<MCEditSingleChoiceDecorationProps> = React.memo(
	() => {
		const Cont = MCEdit.elements.choices.single.rightDecorationContainer;
		const Icon = MCEdit.elements.choices.single.rightIcon;
		const onClick = mcEditHooks.useChoiceDeleteHandler(mcEditHooks.useChoiceId());
		return (
			<Cont onClick={onClick}>
				<Icon />
			</Cont>
		);
	}
);
