import { mathEquationStrategy, MathTagSpan } from "./math";
import { CompositeDecorator } from "draft-js";

export const decorators = [
	{
		strategy: mathEquationStrategy,
		component: MathTagSpan,
	},
];
export const compositeDecorator = new CompositeDecorator(decorators);
