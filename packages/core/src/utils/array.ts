export function generateUniqueId(currentIds: number[]): number;
export function generateUniqueId(
	currentIds: number[],
	numOfIds: number
): number[];
export function generateUniqueId(
	currentIds: number[],
	numOfIds?: number
): number | number[] {
	const ids = [...currentIds];
	const num = numOfIds === undefined ? 1 : numOfIds;
	const newIds: number[] = [];
	for (let i = 0; i < num; ++i) {
		let uid = 0;
		do {
			uid = Math.floor(Math.random() * 1e9);
		} while (ids.indexOf(uid) !== -1);
		newIds.push(uid);
		ids.push(uid);
	}
	if (numOfIds === undefined) return newIds[0];
	return newIds;
}
