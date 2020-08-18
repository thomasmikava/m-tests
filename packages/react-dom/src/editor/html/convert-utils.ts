import { Blockk, StateToHTML } from "./interfaces";

export const firstComeFirstServe = <T extends (...args: any[]) => any>(
	fns: (T | undefined)[],
	defaultValue?: any
): T => {
	return ((...args: any[]) => {
		for (const fn of fns) {
			if (fn) {
				const renderer = fn(...args);
				if (renderer) return renderer;
			}
		}
		return defaultValue;
	}) as T;
};

export const mergeInArray = <T extends (...args: any[]) => any[] | undefined>(
	fns: (T | undefined)[]
): T => {
	return ((...args: any[]) => {
		const results: any[] = [];
		for (const fn of fns) {
			if (fn) {
				const res = fn(...args);
				if (res) results.push(...res);
			}
		}
		return results;
	}) as T;
};

export const createHTMLToState = (settings: Blockk[]) => {
	const htmlToStyle = firstComeFirstServe(settings.map(e => e.htmlToStyle));
	return {
		htmlToBlock: firstComeFirstServe(settings.map(e => e.htmlToBlock)),
		htmlToEntity: firstComeFirstServe(settings.map(e => e.htmlToEntity)),
		textToEntity: mergeInArray(settings.map(e => e.textToEntity)),
		blockRendererFn: firstComeFirstServe(
			settings.map(e => e.blockRendererFn)
		),
		htmlToStyle: (nodeName, node, styles) => {
			return htmlToStyle(nodeName, node, styles) || styles;
		},
	};
};

export const createStateToHTML = (settings: StateToHTML[]): StateToHTML => {
	return {
		blockToHTML: firstComeFirstServe(settings.map(e => e.blockToHTML)),
		entityToHTML: firstComeFirstServe(settings.map(e => e.entityToHTML)),
		styleToHTML: firstComeFirstServe(settings.map(e => e.styleToHTML)),
	};
};
