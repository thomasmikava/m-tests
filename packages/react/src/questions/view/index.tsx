import { ContentType } from "@tests-core/schemas/questions/contnets/common-schemas";
import {
	IRawQuestionContent,
	IRQuestionContent,
} from "@tests-core/schemas/questions/contnets/schemas";
import React, { useRef } from "react";
import { MultipleChoiceContainer } from "./multiple-choice/components/providers";
import { IContentProps } from "./interfaces";
import {
	QuestionDisplaySettingsCont,
	ItemAssessmentsCont,
	CommonQuestionPartsCont,
	UserAnswerCont,
	ContentCont,
} from "./common/hooks/contexts";
import { ContentPath } from "new-tests/utils/path";
import { useStateOnChange } from "new-tests/utils/hooks";
import { CounterComponent } from "./a";
import { CustomizationsNullProvider } from "./customizations/providers";
import { CommonElements } from "./common/components";

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
			<CustomizationsNullProvider value={null}>
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
									<Content
										content={content}
										ref={containerRef}
									/>
								</ContentCont.Provider>
							</CommonQuestionPartsCont.Provider>
						</UserAnswerCont.Provider>
					</ItemAssessmentsCont.Provider>
				</QuestionDisplaySettingsCont.Provider>
			</CustomizationsNullProvider>
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
			const Cont = CommonElements.outerContainer;
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
