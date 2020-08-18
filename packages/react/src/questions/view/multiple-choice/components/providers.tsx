import React from "react";
import { MCComps, MCElements } from ".";
import { CounterComponent } from "../../a";
import { mcHooks } from "../hooks";
import { MCChoiceCont, MCContentCont } from "../hooks/contexts";
import {
	MCBodyProps,
	MCChoicesProps,
	MCSingleChoiceDecorationProps,
	MCSingleChoiceProps,
	MCStatementProps,
	MultipleChoiceNewContainerProps,
} from "./types";

export const MultipleChoiceContainer: React.FC<MultipleChoiceNewContainerProps> = React.memo(
	({ content, path }) => {
		return (
			<>
				<CounterComponent title={"MultipleChoiceNewContainer"} />
				<MCContentCont.Provider value={content}>
					<MCComps.body path={path} />
				</MCContentCont.Provider>
			</>
		);
	}
);

export const MCBody: React.FC<MCBodyProps> = React.memo(({ path }) => {
	return (
		<MCElements.bodyContainer>
			<MCComps.statement.container path={path.add("statement")} />
			<MCComps.choices.container path={path.add("choices")} />
			<MCComps.explanation.container path={path.add("explanation")} />
		</MCElements.bodyContainer>
	);
});

export const MCStatement: React.FC<MCStatementProps> = React.memo(
	({ path }) => {
		const statement = mcHooks.useStatement();
		return (
			<MCElements.statement.container>
				<CounterComponent title="Statementtt" />
				<MCComps.statement.text
					path={path.add("text")}
					stat={statement}
				/>
			</MCElements.statement.container>
		);
	},
	() => true
);

export const MCChoices: React.FC<MCChoicesProps> = React.memo(({ path }) => {
	const choices = mcHooks.useChoices();
	return (
		<>
			<CounterComponent title="MCChoices O" />
			<MCElements.choices.container>
				<CounterComponent title="MCChoices I" />
				{choices.map((choice, index) => (
					<MCChoiceCont.Provider value={choice} key={choice.id}>
						<MCComps.choices.single.container
							choice={choice}
							path={path.add(index)}
						/>
					</MCChoiceCont.Provider>
				))}
			</MCElements.choices.container>
		</>
	);
});

export const MCSingleChoice: React.FC<MCSingleChoiceProps> = React.memo(
	({ path, choice }) => {
		const choiceId = choice.id;

		const handleChange = mcHooks.useOnChoiceCheck(choiceId);

		return (
			<MCElements.choices.single.container onClick={handleChange}>
				<MCComps.choices.single.decoration path={path} />
				<MCElements.choices.single.textContainer>
					<MCComps.choices.single.text
						stat={choice}
						path={path.add("text")}
					/>
				</MCElements.choices.single.textContainer>
			</MCElements.choices.single.container>
		);
	}
);

export const MCSingleChoiceDecoration: React.FC<MCSingleChoiceDecorationProps> = React.memo(
	() => {
		const Cont = MCElements.choices.single.decorationContainer;
		const Icon = MCElements.choices.single.icon;
		return (
			<Cont>
				<Icon />
			</Cont>
		);
	}
);
