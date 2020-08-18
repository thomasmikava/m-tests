import { ICommonQuestionParts, ContentType } from "./common-schemas";
import { IRQuestionContent } from "./schemas";
import { IUserAnswer } from "./user-answer";

export abstract class QuestionContent<AnswerType, UserAns extends IUserAnswer>
	implements ICommonQuestionParts {
	type: ContentType;
	explanation?: ICommonQuestionParts["explanation"];
	allowPartialCredit?: ICommonQuestionParts["allowPartialCredit"];
	minScoreForCredit?: ICommonQuestionParts["minScoreForCredit"];

	public abstract getStripped(): IRQuestionContent;
	public abstract getAnswer(): AnswerType;
	public abstract getCorrectAnswerAsUserAnswer(): UserAns;
	public abstract getCreditShare(userAnswer: UserAns): number;
	public abstract getMaxCredit(): number;
	public abstract getShortStat(separator?: string): string;
	public abstract serialize(separator?: string): string;
	public defaultSeparator = "<br/>";

	public isAnsweredCorrectly(userAnswer: UserAns): boolean {
		const creditShare = this.getCreditShare(userAnswer);
		if (creditShare >= 1 - 1e-6) {
			return true;
		}
		const maxCredit = this.getMaxCredit();
		const myCredit = creditShare * maxCredit;
		if (this.allowPartialCredit) {
			if (this.minScoreForCredit === undefined) {
				return myCredit > 0;
			}
			return myCredit >= this.minScoreForCredit! - 1e-6;
		}
		return false;
	}

	public hasAnsweredFully(userAnswer: UserAns | undefined): boolean {
		if (userAnswer === null || userAnswer === undefined) {
			return false;
		}
		return true;
	}
}
