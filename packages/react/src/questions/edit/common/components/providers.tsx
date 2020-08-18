/* eslint-disable react-hooks/rules-of-hooks */
import { ContentType } from "m-tests-core/lib/questions/common-schemas";
import { IRawQuestionContent } from "m-tests-core/lib/questions/schemas";
import React from "react";

export interface IChooseQuestionContentTypeProps {
	selectedType: ContentType | null;
	selectedDesignStructure: string | null;
	setContent: React.Dispatch<
		React.SetStateAction<IRawQuestionContent | undefined>
	>;
}
