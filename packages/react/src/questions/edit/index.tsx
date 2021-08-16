import { ContentType, EmptyContentCreationSettings } from "m-tests-core/lib/questions/common-schemas";
import { ContentError } from "m-tests-core/lib/questions/errors";
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import { ContentPath } from "m-tests-core/lib/utils/path";
import React from "react";
import { CommonEditCusto } from "./common/components";
import { MultipleChoiceEditContainer } from "./multiple-choice/components/providers";
import { EditContentCont } from "./common/hooks/contexts";
import { SetState } from "../../utils/interfaces";
import { classSetStateProp } from "../../utils/prop";
import { InjectHook } from "custo";
import {
	RawContentToEditableContentFn,
	RawStatToEditableStatFn,
	EditableContentToRawContentFn,
	EditableStatToRawStatFn,
	GetChangedContentFn,
} from "./common/props/types";
import { IChooseQuestionContentTypeRef } from "./common/components/types";

export interface IProps {
	defaultQuestionContent?: IRawQuestionContent;
	defaultContentSettings?: EmptyContentCreationSettings;
	onChange?: (content: IRawQuestionContent | undefined) => void;
	rawContentToEditableContentFn: RawContentToEditableContentFn;
	rawStatToEditableStatFn: RawStatToEditableStatFn;
	editableContentToRawContentFn: EditableContentToRawContentFn;
	editableStatToRawStatFn: EditableStatToRawStatFn;
	getChangedContent: GetChangedContentFn;
}

interface IState {
	content: IRawQuestionContent | undefined;
}
export class QuestionEditwrapperClass extends React.PureComponent<
	IProps,
	IState
> {
	state: IState;
	constructor(props: IProps) {
		super(props);
		let content: IRawQuestionContent | undefined = undefined;
		const {
			defaultQuestionContent,
			defaultContentSettings
		} = props;
		if (defaultQuestionContent) {
			content = defaultQuestionContent;
		} else if (defaultContentSettings && defaultContentSettings.contentType !== undefined) {
			content = this.props.getChangedContent({
				newContentSettings: defaultContentSettings
			});
		}
		if (content) {
			content = this.convertToEditable(content);
		} else {
		}
		this.state = {
			content,
		};
	}

	contentSelectorRef = React.createRef<IChooseQuestionContentTypeRef>();

	getSeletedContentSettings = (): EmptyContentCreationSettings | undefined => {
		if (!this.contentSelectorRef.current) return undefined;
		return this.contentSelectorRef.current.getSettings();
	}
	
	setSeletedContentSettings = (settings: EmptyContentCreationSettings): void => {
		if (!this.contentSelectorRef.current) return;
		return this.contentSelectorRef.current.setSettings(settings);
	}

	setContent: SetState<IRawQuestionContent | undefined> = classSetStateProp(
		this,
		"content",
		() => {
			if (this.props.onChange) {
				this.props.onChange(this.state.content);
			}
		}
	);

	/* private */ convertToEditable = (
		content: IRawQuestionContent
	): IRawQuestionContent => {
		return this.props.rawContentToEditableContentFn(content, {
			rawStatToEditableStatFn: this.props.rawStatToEditableStatFn,
		});
	};

	/* private */ convertToRaw = (
		content: IRawQuestionContent
	): IRawQuestionContent => {
		return this.props.editableContentToRawContentFn(content, {
			editableStatToRawStatFn: this.props.editableStatToRawStatFn,
		});
	};

	setEditableContent: SetState<IRawQuestionContent | undefined> = val => {
		const fn = typeof val === "function" ? val : () => val;
		this.setContent(old => {
			const newVal = fn(old);
			if (!newVal) return newVal;
			return this.convertToEditable(newVal);
		});
	};

	/* private */ getEditableContent = () => this.state.content!;

	getRawContent = () => {
		const content = this.getEditableContent();
		if (!content) {
			throw new Error("no content is defined");
		}
		return this.convertToRaw(content);
	};

	getErrors = (): ContentError[] | null => {
		return null;
	};

	render() {
		const { content } = this.state;
		const { getEditableContent, setContent, setEditableContent } = this;

		const { ContentSelector } = CommonEditCusto.components;

		return (
			<div style={{ textAlign: "left" }}>
				<ContentSelector
					defaultSettings={this.props.defaultContentSettings}
					setContent={setEditableContent}
					ref={this.contentSelectorRef}
				/>
				{content && (
					<EditContentCont.Provider
						content={content}
						onChange={setContent as SetState<IRawQuestionContent>}
						getContent={getEditableContent}
					>
						<Content contentType={content.type} />
					</EditContentCont.Provider>
				)}
			</div>
		);
	}
}

export const QuestionEditwrapper = InjectHook(
	QuestionEditwrapperClass,
	props => {
		const rawContentToEditableContentFn = CommonEditCusto.functions.rawContentToEditableContentFn.use();
		const rawStatToEditableStatFn = CommonEditCusto.functions.rawStatToEditableStatFn.use();
		const editableContentToRawContentFn = CommonEditCusto.functions.editableContentToRawContentFn.use();
		const editableStatToRawStatFn = CommonEditCusto.functions.editableStatToRawStatFn.use();
		const getChangedContent = CommonEditCusto.functions.getChangedContentFn.use();
		return {
			rawContentToEditableContentFn,
			rawStatToEditableStatFn,
			editableContentToRawContentFn,
			editableStatToRawStatFn,
			getChangedContent,
		};
	}
);

const defaultContentPath = new ContentPath();

const Content = React.memo(({ contentType }: { contentType: ContentType }) => {
	const Cont = CommonEditCusto.elements.OuterContainer;
	return (
		<Cont>
			{contentType === ContentType.MultipleChoice && (
				<MultipleChoiceEditContainer path={defaultContentPath} />
			)}
		</Cont>
	);
});
