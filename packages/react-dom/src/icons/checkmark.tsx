import React from "react";
import styles from "./style.module.css";

export const CheckMarkIcon = React.memo(() => {
	return (
		<svg
			className={styles.icon}
			focusable="false"
			viewBox="0 0 24 24"
			aria-hidden="true"
			role="presentation"
		>
			<path fill="none" d="M0 0h24v24H0z"></path>
			<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
		</svg>
	);
});
