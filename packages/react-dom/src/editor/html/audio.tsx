import React from "react";
import { Blockk, StateToHTML, ATOMIC_BLOCK_TYPE } from "./interfaces";
import { getAllAttributes } from "./dom-utils";

export const AUDIO_ENTITY_TYPE = "AUDIO";

interface AudioProps {
	audioProps: React.AudioHTMLAttributes<HTMLAudioElement>;
}

const AudioComponent = React.memo((props: any) => {
	const { audioProps } = props.blockProps as AudioProps;
	return <audio controls {...audioProps} />;
});

export const AudioBlock: Blockk = {
	blockRendererFn: (contentBlock, editor) => {
		const type = contentBlock.getType();
		if (type !== ATOMIC_BLOCK_TYPE) return;
		const content = editor.getEditorState().getCurrentContent();
		const data = content.getEntity(contentBlock.getEntityAt(0)).getData();
		return {
			component: AudioComponent,
			editable: false,
			props: {
				audioProps: data,
			} as AudioProps,
		};
	},
	htmlToBlock: (nodeName, node, lastList, inBlock) => {
		if (
			(nodeName === "figure" &&
				node.firstChild &&
				node.firstChild.nodeName === "AUDIO") ||
			(nodeName === "audio" && inBlock !== ATOMIC_BLOCK_TYPE)
		) {
			return ATOMIC_BLOCK_TYPE;
		}
	},
	htmlToEntity: (nodeName, node, createEntity) => {
		if (nodeName !== "audio") return;
		const attributes = getAllAttributes(node);
		if (attributes.controls === "" || attributes.controls === "controls") {
			delete attributes.controls;
		}
		return createEntity(AUDIO_ENTITY_TYPE, "IMMUTABLE", attributes);
	},
};

export const AudioToHTML: StateToHTML = {
	entityToHTML: block => {
		if (block.type !== AUDIO_ENTITY_TYPE) return;
		return <audio controls={true} {...block.data} />;
	},
};
