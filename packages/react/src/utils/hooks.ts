import { useMemo, useRef, useCallback } from "react";
import { getAbsoluteProperty } from "custo/lib/utils/prop";

export const useAbsoluteProperty = (obj: any, key: string) => {
	return useMemo(() => {
		return getAbsoluteProperty(obj, key);
	}, [obj, key]);
};

export const useStateOnChange = <T>(
	valueRef: React.MutableRefObject<T>,
	onChange: (newVal: T) => void
): React.Dispatch<React.SetStateAction<T>> => {
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	return useCallback(
		(n: T | ((oldVal: T) => T)) => {
			if (typeof n === "function") {
				const fn = n as (oldVal: T) => T;
				valueRef.current = fn(valueRef.current);
			} else {
				valueRef.current = n as T;
			}
			onChangeRef.current(valueRef.current);
		},
		[valueRef]
	);
};

export const useOptimizedFunc = <FN extends (...args: any) => any>(
	fn: FN
): FN => {
	const fnRef = useRef(fn);
	fnRef.current = fn;
	const optimizedFn = useRef((...args: any) => {
		return fnRef.current(...args) as any;
	});
	return optimizedFn.current as FN;
};
