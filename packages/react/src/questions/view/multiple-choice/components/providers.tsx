import React from "react";
import { MCComps, MCElements } from ".";
import { CounterComponent } from "../../a";
import { mcHooks, ConnectWithChoice, MCGetterHooks } from "../hooks";
import { MCChoiceCont, MCContentCont } from "../hooks/contexts";
import {
	MCBodyProps,
	MCChoicesProps,
	MCSingleChoiceDecorationProps,
	MCSingleChoiceProps,
	MCStatementProps,
	MultipleChoiceNewContainerProps,
} from "./types";
import {
	IRMultipleChoiceContent,
	IMultipleChoiceContent,
} from "m-tests-core/lib/questions/multiple-choice/types";

export const MultipleChoiceContainer: React.FC<MultipleChoiceNewContainerProps> = React.memo(
	({ content, path }) => {
		return (
			<>
				<CounterComponent title={"MultipleChoiceNewContainer"} />
				<MCContentCont.Provider value={content}>
					<MCComps.Body path={path} />
				</MCContentCont.Provider>
			</>
		);
	}
);

export const MCBody: React.FC<MCBodyProps> = React.memo(({ path }) => {
	const Container = MCElements.BodyContainer;
	const Statement = MCComps.statement.Container;
	const Choices = MCComps.choices.Container;
	const Explanation = MCComps.explanation.Container;
	return (
		<Container>
			<Statement path={path.add("statement")} />
			<Choices path={path.add("choices")} />
			<Explanation path={path.add("explanation")} />
		</Container>
	);
});

export const MCStatement: React.FC<MCStatementProps> = React.memo(
	({ path }) => {
		const statement = MCGetterHooks.statement.use();
		const Container = MCElements.statement.Container;
		const Text = MCComps.statement.Text;
		return (
			<Container>
				<CounterComponent title="Statementtt" />
				<Text path={path.add("text")} stat={statement} />
			</Container>
		);
	},
	() => true
);

export const MCChoices: React.FC<MCChoicesProps> = React.memo(({ path }) => {
	const choiceIds = MCGetterHooks.allChoiceIds.use();
	const Container = MCElements.choices.Container;
	const SingleChoice = MCComps.choices.single.Container;
	return (
		<>
			<CounterComponent title="MCChoices O" />
			<Container>
				<CounterComponent title="MCChoices I" />
				{choiceIds.map((choiceId, index) => (
					<SingleChoice
						key={choiceId}
						id={choiceId}
						index={index}
						path={path.add(index)}
					/>
				))}
			</Container>
		</>
	);
});

export const MCSingleChoice: React.FC<MCSingleChoiceProps> = React.memo(
	ConnectWithChoice(
		({
			path,
			id,
			choice,
		}: MCSingleChoiceProps & {
			choice:
				| IRMultipleChoiceContent["choices"][number]
				| IMultipleChoiceContent["choices"][number];
		}) => {
			const handleChange = mcHooks.useOnChoiceCheck.use(id);

			const Container = MCElements.choices.single.Container;
			const Decoration = MCComps.choices.single.Decoration;
			const TextContainer = MCElements.choices.single.TextContainer;
			const Text = MCComps.choices.single.Text;

			return (
				<Container onClick={handleChange}>
					<Decoration path={path} />
					<TextContainer>
						<Text stat={choice} path={path.add("text")} />
					</TextContainer>
				</Container>
			);
		}
	)
);

export const MCSingleChoiceDecoration: React.FC<MCSingleChoiceDecorationProps> = React.memo(
	() => {
		const Cont = MCElements.choices.single.DecorationContainer;
		const Icon = MCElements.choices.single.Icon;
		return (
			<Cont>
				<Icon />
			</Cont>
		);
	}
);
