import { Blockk, StateToHTML, ATOMIC_BLOCK_TYPE } from "./interfaces";
import { getAllAttributes } from "./dom-utils";
import React from "react";

export const IMAGE_ENTITY_TYPE = "IMAGE";

interface ImageProps {
	imageProps: React.ImgHTMLAttributes<HTMLImageElement>;
}

const ImageComponent = React.memo((props: any) => {
	const { imageProps } = props.blockProps as ImageProps;
	return <img {...imageProps} />;
});

export const ImageBlock: Blockk = {
	blockRendererFn: (contentBlock, editor) => {
		const content = editor.getEditorState().getCurrentContent();
		if (
			contentBlock.getType() === ATOMIC_BLOCK_TYPE &&
			content.getEntity(contentBlock.getEntityAt(0)).getType() ===
				IMAGE_ENTITY_TYPE
		) {
			const data = content
				.getEntity(contentBlock.getEntityAt(0))
				.getData();

			return {
				component: ImageComponent,
				editable: false,
				props: {
					imageProps: data,
				} as ImageProps,
			};
		}
	},
	htmlToBlock: (nodeName, node, lastList, inBlock) => {
		if (
			(nodeName === "figure" &&
				node.firstChild &&
				node.firstChild.nodeName === "IMG") ||
			(nodeName === "img" && inBlock !== ATOMIC_BLOCK_TYPE)
		) {
			return ATOMIC_BLOCK_TYPE;
		}
	},
	htmlToEntity: (nodeName, node, createEntity) => {
		if (nodeName !== "img") return;
		const attributes = getAllAttributes(node);
		moveFromStyleToAttributes(attributes, "width");
		moveFromStyleToAttributes(attributes, "height");
		return createEntity(IMAGE_ENTITY_TYPE, "IMMUTABLE", attributes);
	},
};

const moveFromStyleToAttributes = (
	attributes: Record<any, any>,
	prop: string
) => {
	if (!attributes[prop] && attributes.style && attributes.style[prop]) {
		attributes[prop] = attributes.style[prop];
		delete attributes.style[prop];
	}
};

export const ImageToHTML: StateToHTML = {
	entityToHTML: entity => {
		if (entity.type !== IMAGE_ENTITY_TYPE) return;
		return <img {...(entity.data as any)} />;
	},
};
