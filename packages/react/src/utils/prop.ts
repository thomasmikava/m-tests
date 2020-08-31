import { SetState } from "./interfaces";

export function getAbsoluteProperty(obj: object, deepKey: string) {
	const keys = deepKey.split(".");
	let last: any = obj;
	for (const key of keys) {
		last = last?.[key];
		if (last === null || typeof last !== "object") break;
	}
	return last;
}

const copyObj = <T extends Readonly<Record<any, unknown>>>(val: T): T => {
	if (Array.isArray(val)) {
		return ([...val] as unknown) as T;
	}
	return { ...val };
};

export function getUpdatedAbsoluteProperty(
	obj: any,
	deepKey: string,
	newValue: any
) {
	const keys = deepKey.split(".");
	if (keys.length === 0) return obj;
	let last = copyObj(obj) as any;
	const main = last;
	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		const oldLast = last;
		last = oldLast?.[key];
		if (last === null || typeof last !== "object") {
			return obj;
		}
		last = copyObj(last);
		oldLast[key] = last;
	}
	const lastKey = keys[keys.length - 1];
	last[lastKey] = newValue;
	return main;
}

export const classSetStateProp = <
	T extends Readonly<Record<any, any>>,
	K extends keyof T
>(
	that: { setState: React.Component<any, T>["setState"] },
	key: K,
	callback?: () => void
): SetState<T[K]> => {
	return vl => {
		const setState = that.setState;
		const fn: any = typeof vl === "function" ? vl : () => vl;
		setState.call(
			that,
			({ [key]: currentVal }: any) => {
				return {
					[key]: fn(currentVal),
				} as any;
			},
			callback
		);
	};
};
