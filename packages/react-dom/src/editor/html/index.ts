import { convertFromHTML, convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import { compositeDecorator } from "../decorators";
import { AudioBlock, AudioToHTML } from "./audio";
import {
	replaceTagWithChildren,
	setTagInnerHTML,
	createElementFromHTML,
	forEachTag,
	putElementInParent,
} from "./dom-utils";
import { ImageBlock, ImageToHTML } from "./image";
import { Blockk, StateToHTML } from "./interfaces";
import { SubAndSupScriptsToHTML, SubAndSupScriptsToState } from "./scripts";
import {
	createHTMLToState,
	createStateToHTML,
	firstComeFirstServe,
} from "./convert-utils";

const blocks: Blockk[] = [ImageBlock, AudioBlock, SubAndSupScriptsToState];
const toHTML: StateToHTML[] = [
	ImageToHTML,
	AudioToHTML,
	SubAndSupScriptsToHTML,
];

const htmlConverter = convertFromHTML(createHTMLToState(blocks) as any);
const stateConverter = convertToHTML(createStateToHTML(toHTML) as any);

export const blockRendererFn = firstComeFirstServe(
	blocks.map(e => e.blockRendererFn)
) as any;

export const fromHTMLToState = (html: string): EditorState => {
	if (
		!html ||
		(typeof html === "string" && html.trim().match(/^(&nbsp;)+$/g))
	) {
		return EditorState.createEmpty(compositeDecorator);
	}

	html = normalizeHTML(html || "");

	const content = htmlConverter(html);
	const editorState = EditorState.createWithContent(content);

	return editorState;
};

export const fromStateToHTML = (editorState: EditorState) => {
	const content = editorState.getCurrentContent();
	if (!content.hasText()) return "";

	let html = stateConverter(content);

	const body = createElementFromHTML(html);

	setTagInnerHTML(body, "audio", "");
	forEachTag(body, "audio", audio => {
		if (audio.getAttribute("controls") === "") {
			audio.setAttribute("controls", "controls");
		}
	});

	replaceTagWithChildren(body, "figure");

	replaceTagWithChildren(body, "p", (p, { isLastChildOfRoot }) => {
		const inner = p.innerHTML;
		if (!inner) return "<br/>";
		if (p.lastChild) {
			if (p.lastChild.nodeName === "BR") {
				return inner;
			}
		}
		if (isLastChildOfRoot) {
			return inner;
		}
		return inner + "<br/>";
	});

	html = body.innerHTML;
	html = html.replace(/\n/g, "");
	html = html.replace(/(<br>|<br ?\/>)/g, "\n");
	if (html[0] === specialEmptySpace) {
		html = html.substr(1);
	}

	return html;
};

const specialEmptySpace = "​";

export const normalizeHTML = (html: string): string => {
	html = html.replace(/\n/g, "<br/>");

	const body = createElementFromHTML(html);
	normalizeBreakLines(body);
	html = body.innerHTML;
	html = html.replace(/ {2,}/g, matched => {
		return " " + new Array(matched.length - 1).fill("&nbsp;").join("");
	});
	if (html[0] === " ") {
		html = specialEmptySpace + "&nbsp;" + html.substr(1);
	}
	if (html[html.length - 1] === " ") {
		html = html.substr(0, html.length - 1) + "&nbsp;";
	}

	return html;
};

const normalizeBreakLines = (body: HTMLElement) => {
	const children = [...body.childNodes];
	for (const child of children) {
		if (child.nodeName !== "BR") break;
		const paragraph = document.createElement("p");
		putElementInParent(child as HTMLElement, paragraph);
		paragraph.innerHTML = "";
	}
};
