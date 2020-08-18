export interface IQuestionItemAssessment {
	credit: number;
}

export interface IQuestionItemsAssessment {
	[itemId: number]:
		| {
				credit: number;
		  }
		| undefined;
}

export interface IQuestionAssessment {
	credit?: number;
	assessmentProgress: number;
	items: IQuestionItemsAssessment;
}
