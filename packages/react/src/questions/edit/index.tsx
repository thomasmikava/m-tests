import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { ContentError } from "m-tests-core/lib/questions/errors";
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import { ContentPath } from "m-tests-core/lib/utils/path";
import React from "react";
import { CommonEditCusto } from "./common/components";
import { getChangedContent } from "./helpers/default-content";
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
} from "./common/props/types";

export type GetChangedContentFN = (args: {
	old: { content?: IRawQuestionContent; designStructure?: string };
	new: { contentType: ContentType; designStructure?: string };
}) => IRawQuestionContent | undefined;

export interface IProps {
	defaultQuestionContent?: IRawQuestionContent;
	defaultContentType?: ContentType;
	defaultDesignStructure?: string;
	onChange?: (content: IRawQuestionContent | undefined) => void;
	rawContentToEditableContentFn: RawContentToEditableContentFn;
	rawStatToEditableStatFn: RawStatToEditableStatFn;
	editableContentToRawContentFn: EditableContentToRawContentFn;
	editableStatToRawStatFn: EditableStatToRawStatFn;
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
			defaultContentType,
			defaultDesignStructure,
		} = props;
		if (defaultQuestionContent) {
			content = defaultQuestionContent;
		} else if (defaultContentType !== undefined) {
			content = getChangedContent({
				newContentType: defaultContentType,
				newDesignStructure: defaultDesignStructure || null,
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

		const designStructure: string | null =
			(content as any)?.designStructure ?? null;
		const contentType = content?.type;

		const { ContentSelector } = CommonEditCusto.components;

		return (
			<div style={{ textAlign: "left" }}>
				<ContentSelector
					setContent={setEditableContent}
					selectedType={contentType ?? null}
					selectedDesignStructure={designStructure ?? null}
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
		return {
			rawContentToEditableContentFn,
			rawStatToEditableStatFn,
			editableContentToRawContentFn,
			editableStatToRawStatFn,
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
