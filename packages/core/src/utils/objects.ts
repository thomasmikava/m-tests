export function removeKeys<T, K extends keyof T>(
	obj: T,
	...keys: K[]
): Omit<T, K> {
	const obj2 = { ...obj };
	for (let i = 0; i < keys.length; ++i) {
		delete obj2[keys[i]];
	}
	return obj2;
}

export function pickKeys<T extends {}, K extends keyof T>(
	obj: T,
	...keys: K[]
): Pick<T, K> {
	const obj2 = {} as Pick<T, K>;
	for (let i = 0; i < keys.length; ++i) {
		if (obj.hasOwnProperty(keys[i]) || obj[keys[i]] !== undefined) {
			obj2[keys[i]] = obj[keys[i]];
		}
	}
	return obj2;
}
