import React, {
	useRef,
	useEffect,
	useCallback,
	useState,
	useLayoutEffect,
} from "react";

const remounted: Record<any, any> = {};

const useForceUpdate = () => {
	const [c, setC] = useState(0);
	return useCallback(() => {
		setC(x => x + 1);
	}, []);
};

export function CounterComponent({ title }: { title: string }) {
	const forceUpdate = useForceUpdate();
	const counterRef = useRef(-1);
	let renderCount = counterRef.current;
	renderCount++;
	useEffect(() => {
		counterRef.current = renderCount;
	});
	useLayoutEffect(forceUpdate, []);
	useEffect(() => {
		return () => {
			remounted[title] = remounted[title] ? remounted[title] + 1 : 1;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const remountCount = remounted[title] || 0;
	return (
		<div>
			{title}:{" "}
			{!!renderCount &&
				`rendered: ${renderCount} ${
					renderCount > 1 ? "times" : "time"
				}. `}
			{!!remountCount &&
				`remounted: ${remountCount} ${
					remountCount > 1 ? "times" : "time"
				}`}
		</div>
	);
}
