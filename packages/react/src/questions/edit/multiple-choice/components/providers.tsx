import React from "react";
import { CounterComponent } from "../../../view/a";
import { MCEditContentCont } from "../hooks/contexts";
import { MCEditComps } from ".";
import { MultipleChoiceNewContainerProps } from "new-tests/components/questions/view/multiple-choice/components/types";
import { MCEditBodyProps } from "./types";

export const MultipleChoiceEditContainer: React.FC<MultipleChoiceNewContainerProps> = React.memo(
	({ content, path }) => {
		return (
			<>
				<CounterComponent title={"MultipleChoiceEditNewContainer"} />
				<MCEditContentCont.Provider value={content}>
					<MCEditComps.body path={path} />
				</MCEditContentCont.Provider>
			</>
		);
	}
);

export const MCEditBody: React.FC<MCEditBodyProps> = React.memo(({ path }) => {
	return <div>sad</div>;
});
