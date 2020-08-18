export function arrayToObject<T extends {}, K extends keyof T>(
	arr: readonly T[],
	mainKey: K,
	allowMultiple?: false
): { [key: string]: T | undefined };
export function arrayToObject<T extends {}, K extends keyof T>(
	arr: readonly T[],
	mainKey: K,
	allowMultiple: true
): { [key: string]: T[] | undefined };

export function arrayToObject<T extends {}, K extends keyof T>(
	arr: readonly T[],
	mainKey: K,
	allowMultiple: true
): { [key: string]: T[] | undefined };

export function arrayToObject<T extends {}, V>(
	arr: readonly T[],
	fn: (
		item: T,
		index: number,
		orgininalArr: T[]
	) => { key: string | number; value: V } | null,
	allowMultiple?: false
): { [key: string]: V | undefined };
export function arrayToObject<T extends {}, V>(
	arr: readonly T[],
	fn: (item: T) => { key: string | number; value: V } | null,
	allowMultiple: true
): { [key: string]: V[] | undefined };

export function arrayToObject(
	arr: readonly any[],
	mainKey: any,
	allowMultiple = false
): { [key: string]: any } {
	const obj: { [key: string]: any } = {};
	if (!allowMultiple) {
		for (let i = 0; i < arr.length; ++i) {
			let key = arr[i][mainKey as string];
			let value = arr[i];
			if (typeof mainKey === "function") {
				const temp = mainKey(arr[i], i, arr);
				if (!temp) continue;
				key = temp.key;
				value = temp.value;
			}
			obj[key] = value;
		}
	} else {
		for (let i = 0; i < arr.length; ++i) {
			let key = arr[i][mainKey as string];
			let value = arr[i];
			if (typeof mainKey === "function") {
				const temp = mainKey(arr[i], i, arr);
				if (!temp) continue;
				key = temp.key;
				value = temp.value;
			}
			if (!obj[key]) {
				obj[key] = [];
			}
			(obj[key] as any[]).push(value);
		}
	}
	return obj;
}

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
