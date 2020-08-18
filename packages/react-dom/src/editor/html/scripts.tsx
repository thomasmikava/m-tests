import { StateToHTML, Blockk } from "./interfaces";

export const SubAndSupScriptsToState: Blockk = {
	htmlToStyle: (nodeName, node, currentStyle) => {
		if (nodeName === "sup") {
			return currentStyle.add("SUPERSCRIPT");
		}
		if (nodeName === "sub") {
			return currentStyle.add("SUBSCRIPT");
		}
	},
};

export const SubAndSupScriptsToHTML: StateToHTML = {
	styleToHTML: style => {
		if (style === "SUPERSCRIPT") {
			return {
				start: "<sup>",
				end: "</sup>",
			};
		}
		if (style === "SUBSCRIPT") {
			return {
				start: "<sub>",
				end: "</sub>",
			};
		}
	},
};
