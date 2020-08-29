import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { ContentError } from "m-tests-core/lib/questions/errors";
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import { ContentPath } from "m-tests-core/lib/utils/path";
import React, { useCallback, useRef, useState } from "react";
import { useOptimizedFunc } from "../../utils/hooks";
import { CounterComponent } from "../view/a";
import { CommonEditCusto } from "./common/components";
import { CustomizationsEditNullProvider } from "./customizations/providers";
import { getChangedContent } from "./helpers/default-content";
import { MultipleChoiceEditContainer } from "./multiple-choice/components/providers";
import { EditContentCont } from "./common/hooks/contexts";
import { SetState } from "../../utils/interfaces";

export type GetChangedContentFN = (args: {
	old: { content?: IRawQuestionContent; designStructure?: string };
	new: { contentType: ContentType; designStructure?: string };
}) => IRawQuestionContent | undefined;

interface IProps {
	defaultQuestionContent?: IRawQuestionContent;
	onSave?: (errors: ContentError[] | null, data: IRawQuestionContent) => void;
	defaultContentType?: ContentType;
	defaultDesignStructure?: string;
}

export const QuestionEditwrapper: React.FC<IProps> = React.memo(
	({
		defaultQuestionContent,
		onSave,
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
		const contentRef = useRef(content as IRawQuestionContent);
		const getContent = useCallback(() => contentRef.current, []);

		const designStructure: string | null =
			(content as any)?.designStructure ?? null;
		const contentType = content?.type;

		const ref = useRef<any>(null);

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

		const ChooseQuestionContentType = CommonEditCusto.components.contentSelector;

		return (
			<CustomizationsEditNullProvider value={null}>
				<div style={{ textAlign: "left" }}>
					<button onClick={incr}>{x} increment</button>
					<ChooseQuestionContentType
						setContent={setContent}
						selectedType={contentType ?? null}
						selectedDesignStructure={designStructure ?? null}
					/>
					{content && <EditContentCont.Provider content={content!} onChange={setContent as SetState<IRawQuestionContent>} getContent={getContent}>
						<Content contentType={content.type} ref={ref} />
						<button onClick={handleSave}>Save</button>
					</EditContentCont.Provider>}
				</div>
			</CustomizationsEditNullProvider>
		);
	}
);

const defaultContentPath = new ContentPath();

const Content = React.memo(
	React.forwardRef(
		({ contentType }: { contentType: ContentType }, ref: any) => {
			const Cont = CommonEditCusto.elements.outerContainer;
			return (
				<Cont ref={ref}>
					<CounterComponent title={"Content"} />
					{contentType === ContentType.MultipleChoice && (
						<MultipleChoiceEditContainer
							path={defaultContentPath}
						/>
					)}
				</Cont>
			);
		}
	)
);
