export const joinClassNames = (
	...classnames: (string | boolean | null | undefined)[]
): string => {
	return classnames
		.filter(e => !!e && typeof e !== "boolean" && typeof e !== "number")
		.map(e => {
			if (!e) return "";
			return e;
		})
		.join(" ");
};
