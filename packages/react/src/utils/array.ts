
export function getUniqueId(currentIds: number[], numOfIds = 1): number[] {
	const ids = [...currentIds];
	const newIds: number[] = [];
	for (let i = 0; i < numOfIds; ++i) {
		let uid = 0;
		do {
			uid = Math.floor(Math.random() * 1e9);
		} while (ids.indexOf(uid) !== -1);
		newIds.push(uid);
		ids.push(uid);
	}
	return newIds;
}
