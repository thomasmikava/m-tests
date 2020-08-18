export function createElementFromHTML(htmlString: string) {
	const node = document.createElement("body");
	node.innerHTML = htmlString;
	return node;
}

export function putTagInParent(
	rootElement: HTMLElement,
	tag: keyof HTMLElementTagNameMap,
	creatreParentElement: (child: HTMLElement) => HTMLElement
) {
	const elements = [...rootElement.getElementsByTagName(tag)];
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		putElementInParent(element, creatreParentElement(element));
	}
}

export function putElementInParent(element: HTMLElement, parent: HTMLElement) {
	const oldParent = element.parentNode!;
	oldParent.replaceChild(parent, element);
	parent.appendChild(element);
}

export function setTagInnerHTML(
	htmlElement: HTMLElement,
	tag: keyof HTMLElementTagNameMap,
	innerHTML: string
) {
	const elements = [...htmlElement.getElementsByTagName(tag)];
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		element.innerHTML = innerHTML;
	}
}

export function forEachTag<K extends keyof HTMLElementTagNameMap>(
	htmlElement: HTMLElement,
	tag: K,
	forEach: (element: HTMLElementTagNameMap[K]) => void
) {
	const elements = [...htmlElement.getElementsByTagName(tag)];
	for (let i = 0; i < elements.length; i++) {
		forEach(elements[i]);
	}
}

export function getAllAttributes(el: HTMLElement): Record<string, any> {
	const obj = {};
	const atts = el.attributes;
	const n = atts.length;
	for (let i = 0; i < n; i++) {
		const att = atts[i];
		obj[att.nodeName] = att.nodeValue;
		if (att.nodeName === "style") {
			obj[att.nodeName] = parseStyles(obj[att.nodeName]);
		}
	}
	return obj;
}

export function replaceTagWithChildren(
	rootElement: HTMLElement,
	tag: keyof HTMLElementTagNameMap,
	replaceWith?: (
		element: HTMLElement,
		args: { isLastChild: boolean; isLastChildOfRoot: boolean }
	) => string | null
) {
	const rootLastChild = rootElement.lastChild;
	const elements = [...rootElement.getElementsByTagName(tag)];
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		const isLastChild = element.parentNode!.lastChild === element;
		const isLastChildOfRoot = rootLastChild === element;
		const newVal = replaceWith
			? replaceWith(element, { isLastChild, isLastChildOfRoot })
			: element.innerHTML;
		if (newVal === null) {
			element.remove();
		} else {
			element.outerHTML = newVal;
		}
	}
}

const parseStyles = (styles: string): React.CSSProperties =>
	styles
		.split(";")
		.filter(style => style.split(":")[0] && style.split(":")[1])
		.map(style => [
			style
				.split(":")[0]
				.trim()
				.replace(/-./g, c => c.substr(1).toUpperCase()),
			style
				.split(":")
				.slice(1)
				.join(":")
				.trim(),
		])
		.reduce(
			(styleObj, style) => ({
				...styleObj,
				[style[0]]: style[1],
			}),
			{}
		);
