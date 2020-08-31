import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import {
	IRawQuestionContent,
	IRQuestionContent,
} from "m-tests-core/lib/questions/schemas";
import { ContentPath } from "m-tests-core/lib/utils/path";
import React, { useRef } from "react";
import { useStateOnChange } from "../../utils/hooks";
import { CounterComponent } from "./a";
import { CommonElements } from "./common/components";
import {
	CommonQuestionPartsCont,
	ContentCont,
	ItemAssessmentsCont,
	QuestionDisplaySettingsCont,
	UserAnswerCont,
} from "./common/hooks/contexts";
import { IContentProps } from "./interfaces";
import { MultipleChoiceContainer } from "./multiple-choice/components/providers";

interface IProps extends IContentProps<any> {
	containerRef?: React.RefObject<HTMLDivElement>;
}

export const QuestionContentTestMode: React.FC<IProps> = React.memo(
	({
		content,
		onUserAnswerChange,
		userAnswer,
		containerRef,
		shuffleKey,
		displayAnswer,
		displayExplanation,
		disableEditingAnswer,
		displayItemAssessments,
		itemsAssessments,
		onItemsAssessmentsChange,
	}) => {
		const userAnswerRef = useRef(userAnswer);
		userAnswerRef.current = userAnswer;
		const dynamicOnUserAnswerChange = useStateOnChange(
			userAnswerRef,
			onUserAnswerChange
		);

		const fContent = content as IRawQuestionContent;
		return (
			<QuestionDisplaySettingsCont.Provider
				displayAnswer={displayAnswer}
				displayExplanation={displayExplanation}
				disableEditingAnswer={disableEditingAnswer}
				displayItemAssessments={displayItemAssessments}
				shuffleKey={shuffleKey}
			>
				<ItemAssessmentsCont.Provider
					display={displayItemAssessments}
					onChange={onItemsAssessmentsChange}
					value={itemsAssessments}
				>
					<UserAnswerCont.Provider
						onChange={dynamicOnUserAnswerChange}
						isDisabled={!!disableEditingAnswer}
						displayAnswer={displayAnswer}
						userAnswer={userAnswer}
					>
						<CommonQuestionPartsCont.Provider
							type={fContent.type}
							allowPartialCredit={fContent.allowPartialCredit}
							minScoreForCredit={fContent.minScoreForCredit}
						>
							<ContentCont.Provider value={content}>
								<Content content={content} ref={containerRef} />
							</ContentCont.Provider>
						</CommonQuestionPartsCont.Provider>
					</UserAnswerCont.Provider>
				</ItemAssessmentsCont.Provider>
			</QuestionDisplaySettingsCont.Provider>
		);
	}
);

const defaultContentPath = new ContentPath();

const Content = React.memo(
	React.forwardRef(
		(
			{ content }: { content: IRQuestionContent | IRawQuestionContent },
			ref: any
		) => {
			const Cont = CommonElements.OuterContainer;
			return (
				<Cont ref={ref}>
					<CounterComponent title={"Content"} />
					{content.type === ContentType.MultipleChoice && (
						<MultipleChoiceContainer
							content={content}
							path={defaultContentPath}
						/>
					)}
				</Cont>
			);
		}
	)
);
