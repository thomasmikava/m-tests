import QuestionContentEditMode, {
	IQContentEditPassableProps,
} from "@tests-core/components/questions/contents/edit";
import { ContentError } from "@tests-core/components/questions/contents/interfaces";
import { ContentType } from "@tests-core/schemas/questions/contnets/common-schemas";
import { IRawQuestionContent } from "@tests-core/schemas/questions/contnets/schemas";
import { IFullQuestion } from "@tests-core/schemas/questions/helper-schemas";
import { useOptimizedFunc } from "new-tests/utils/hooks";
import React, { useCallback, useRef, useState } from "react";
import { ChooseQuestionContentType } from "./helpers/components/content-type";
import { getChangedContent } from "./helpers/default-content";
import { CustomizationsEditNullProvider } from "./customizations/providers";
import { MultipleChoiceEditContainer } from "./multiple-choice/components/providers";
import { ContentPath } from "new-tests/utils/path";
import { CounterComponent } from "../view/a";
import { CommonEdit } from "./common/components";

export type GetChangedContentFN = (args: {
	old: { content?: IRawQuestionContent; designStructure?: string };
	new: { contentType: ContentType; designStructure?: string };
}) => IRawQuestionContent | undefined;

interface IProps {
	defaultQuestionContent?: IFullQuestion["content"];
	onSave?: (errors: ContentError[] | null, data: IRawQuestionContent) => void;
	customized?: IQContentEditPassableProps;
	defaultContentType?: ContentType;
	defaultDesignStructure?: string;
}

export const QuestionEditwrapper: React.FC<IProps> = React.memo(
	({
		defaultQuestionContent,
		onSave,
		customized,
		defaultContentType,
		defaultDesignStructure,
	}: IProps) => {
		const [content, setContent] = useState(():
			| IRawQuestionContent
			| undefined => {
			if (defaultQuestionContent) {
				return defaultQuestionContent;
			}
			if (defaultContentType === undefined) return undefined;
			return getChangedContent({
				newContentType: defaultContentType,
				newDesignStructure: defaultDesignStructure || null,
			});
		});

		const designStructure: string | null =
			(content as any)?.designStructure ?? null;
		const contentType = content?.type;

		const ref = useRef<QuestionContentEditMode | null>(null);

		const getData = useOptimizedFunc(() => {
			if (!ref.current) return;
			const component = ref.current;
			const content = component.getData() as IRawQuestionContent;
			return content;
		});

		const getErrors = useOptimizedFunc((): ContentError[] | null => {
			if (!ref.current) return null;
			return ref.current.getErrors();
		});

		const handleSave = useOptimizedFunc(() => {
			if (!onSave) return;
			const data = getData();
			if (!data) return;
			onSave(getErrors(), data);
		});

		const [x, setX] = useState(0);
		const incr = useCallback(() => setX(x => x + 1), []);

		return (
			<CustomizationsEditNullProvider value={null}>
				<div style={{ textAlign: "left" }}>
					<button onClick={incr}>{x} increment</button>
					<ChooseQuestionContentType
						setContent={setContent}
						selectedType={contentType ?? null}
						selectedDesignStructure={designStructure ?? null}
					/>
					{content && content.type === ContentType.MultipleChoice ? (
						<Content content={content} />
					) : (
						contentType !== undefined &&
						!!content && (
							<>
								<QuestionContentEditMode
									key={
										contentType +
										"-" +
										(designStructure || "")
									}
									content={content}
									contentType={contentType}
									ref={ref}
									customized={customized}
								/>
								<button onClick={handleSave}>Save</button>
							</>
						)
					)}
				</div>
			</CustomizationsEditNullProvider>
		);
	}
);

const defaultContentPath = new ContentPath();

const Content = React.memo(
	React.forwardRef(
		({ content }: { content: IRawQuestionContent }, ref: any) => {
			const Cont = CommonEdit.elements.outerContainer;
			return (
				<Cont ref={ref}>
					<CounterComponent title={"Content"} />
					{content.type === ContentType.MultipleChoice && (
						<MultipleChoiceEditContainer
							content={content}
							path={defaultContentPath}
						/>
					)}
				</Cont>
			);
		}
	)
);
