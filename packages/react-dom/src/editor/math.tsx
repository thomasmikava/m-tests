import React from "react";
import asciimath2latex from "asciimath-to-latex";

export const MathTagSpan = props => (
	<span className="contentEditableMathEquationSpan">{props.children}</span>
);

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
