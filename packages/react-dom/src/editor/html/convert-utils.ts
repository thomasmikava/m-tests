export const firstComeFirstServe = <T extends (...args: any[]) => any>(
	fns: (T | undefined)[],
	defaultValue?: any
): T => {
	return ((...args: any[]) => {
		for (const fn of fns) {
			if (fn) {
				const renderer = fn(...args);
				if (renderer) return renderer;
			}
		}
		return defaultValue;
	}) as T;
};

export const mergeInArray = <T extends (...args: any[]) => any[] | undefined>(
	fns: (T | undefined)[]
): T => {
	return ((...args: any[]) => {
		const results: any[] = [];
		for (const fn of fns) {
			if (fn) {
				const res = fn(...args);
				if (res) results.push(...res);
			}
		}
		return results;
	}) as T;
};
