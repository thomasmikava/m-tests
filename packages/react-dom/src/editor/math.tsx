import React from "react";
import { ContentBlock } from "draft-js";
import asciimath2latex from "asciimath-to-latex";

export function mathEquationStrategy(contentBlock, callback) {
	findWithRegex(MATH_EQUATION_REGEX, contentBlock, callback);
}
export const MathTagSpan = props => (
	<span className="contentEditableMathEquationSpan">{props.children}</span>
);

export const MATH_EQUATION_REGEX = /`(.+?)`/g;

function findWithRegex(
	regex: RegExp,
	contentBlock: ContentBlock,
	callback: (start: number, end: number) => void
) {
	const text = contentBlock.getText();
	let matchArr;
	let start;
	while ((matchArr = regex.exec(text)) !== null) {
		start = matchArr.index;
		callback(start, start + matchArr[0].length);
	}
}

export const MathRegexes = [/`(.+?)`/g, /<<(.+?)>>/g, /&lt;&lt;(.+?)&gt;&gt;/g];

export const covertASCIIMathToLaTex = (html: string): string => {
	const katex = (window as any).katex;
	if (!katex) return html;
	for (const regex of MathRegexes) {
		html = html.replace(regex, (a, matched) => {
			const latexStr = asciimath2latex(matched);
			const latexHTML = katex.renderToString(latexStr, {
				throwOnError: false,
			});
			return latexHTML;
		});
	}
	return html;
};
