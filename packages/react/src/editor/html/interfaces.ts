import { EntityKey, Tag } from "draft-convert";
import {
	ContentBlock,
	DraftBlockType,
	Entity,
	EditorState,
	DraftInlineStyleType,
	RawDraftEntity,
	RawDraftContentBlock,
} from "draft-js";
import React from "react";

export const ATOMIC_BLOCK_TYPE = "atomic";

export type TextEntity = {
	entity: EntityKey;
	offset: number;
	length: number;
	result?: string;
};

export interface Blockk {
	blockRendererFn?: (
		contentBlock: ContentBlock,
		editor: { getEditorState: () => EditorState }
	) =>
		| {
				editable: boolean;
				props: Record<string, any>;
				component: React.ComponentType;
		  }
		| undefined;
	htmlToBlock?: <K extends keyof HTMLElementTagNameMap>(
		nodeName: K,
		node: HTMLElementTagNameMap[K],
		lastList: any,
		inBlock: string
	) => DraftBlockType | { type: DraftBlockType; data: object } | undefined;
	htmlToEntity?: <K extends keyof HTMLElementTagNameMap>(
		nodeName: K,
		node: HTMLElementTagNameMap[K],
		createEntity: (
			type: string,
			mutability: string,
			data: object
		) => EntityKey,
		getEntity: (key: EntityKey) => Entity,
		mergeEntityData: (key: string, data: object) => void,
		replaceEntityData: (key: string, data: object) => void
	) => string | undefined;
	textToEntity?: (
		text: string,
		createEntity: (
			type: string,
			mutability: string,
			data: object
		) => EntityKey,
		getEntity: (key: EntityKey) => Entity,
		mergeEntityData: (key: string, data: object) => void,
		replaceEntityData: (key: string, data: object) => void
	) => TextEntity[] | undefined;
	htmlToStyle?: <K extends keyof HTMLElementTagNameMap>(
		nodeName: K,
		node: HTMLElementTagNameMap[K],
		currentStyle: any
	) => any;
}

export interface StateToHTML {
	styleToHTML?: (style: DraftInlineStyleType | string) => Tag | void;
	blockToHTML?: (block: RawDraftContentBlock) => Tag | void;
	entityToHTML?: (entity: RawDraftEntity, originalText: string) => Tag | void;
}
