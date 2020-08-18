export enum ContentErrorToken {
	mcNoCorrectChoice = "mc-no-correct-choice",
	emptyStatement = "empty-stat",
}

export interface ContentError {
	engMessage: string;
	errorToken: ContentErrorToken;
	details?: any;
}
