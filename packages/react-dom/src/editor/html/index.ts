import {
	createElementFromHTML,
	forEachTag,
	putElementInParent,
	replaceTagWithChildren,
	setTagInnerHTML,
} from "./dom-utils";

const isHTMLEmpty = (html: string) => {
	return html.trim().match(/^(&nbsp;)+$/g);
};

export const htmlToSavableHtml = (html: string) => {
	const body = createElementFromHTML(html);

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
	html = html.replace(/&nbsp;/g, " ");
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
	html = html.replace(/( )((&nbsp;){1,})/g, "&nbsp;$2");

	return html;
};

export const normalizeBreakLines = (body: HTMLElement) => {
	const children = [...body.childNodes];
	for (const child of children) {
		if (child.nodeName !== "BR") break;
		const paragraph = document.createElement("p");
		putElementInParent(child as HTMLElement, paragraph);
		paragraph.innerHTML = "";
	}
};
