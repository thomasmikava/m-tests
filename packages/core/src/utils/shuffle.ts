export class PseudoRandom {
	seed: number;
	constructor(newSeed: number) {
		if (!Number.parseInt("" + newSeed, 10)) {
			throw new Error("Seed must be an Integer");
		}
		this.seed = newSeed % 2147483647;
		if (this.seed <= 0) this.seed += 2147483646;
	}

	nextInt(maxNum: number | null = null): number {
		if (maxNum === null) {
			this.seed = (this.seed * 16807) % 2147483647;
			return this.seed;
		}
		this.seed = (this.seed * 16807) % 2147483647;
		return this.seed % maxNum;
	}
}

export function getShuffledIndices(n: number, key: number): number[] {
	const indexArray: number[] = [];

	for (let i = 0; i < n; i++) {
		indexArray[i] = i;
	}
	if (key <= 0) return indexArray;

	const shuffledKeys: number[] = [];

	const rand = new PseudoRandom(key);
	let indexLimit = n;

	for (let i = 0; i < n; i++) {
		const randomIndex = rand.nextInt(indexLimit);

		shuffledKeys[i] = indexArray[randomIndex];
		const temp = indexArray[indexLimit - 1];
		indexArray[indexLimit - 1] = indexArray[randomIndex];
		indexArray[randomIndex] = temp;
		indexLimit--;
	}
	return shuffledKeys;
}

export function shuffleArrayByKey<T>(arr: T[], key: number): T[] {
	const n = arr.length;
	const shuffledKeys = getShuffledIndices(n, key);
	const shuffledValues: T[] = [];
	for (let i = 0; i < n; ++i) {
		shuffledValues[i] = arr[shuffledKeys[i]];
	}
	return shuffledValues;
}

export function unshuffleArrayByKey<T>(arr: T[], key: number): T[] {
	const n = arr.length;
	const shuffledKeys = getShuffledIndices(n, key);
	const shuffledValues: T[] = [];
	for (let i = 0; i < n; ++i) {
		shuffledValues[shuffledKeys[i]] = arr[i];
	}
	return shuffledValues;
}

export function getIndexInOrigianlArrayByKey(
	index: number,
	arrayLength: number,
	key: number
): number {
	if (index >= arrayLength) return -1;
	const shuffledArr = getShuffledIndices(arrayLength, key);
	return shuffledArr[index];
}

export function getIndexInShuffledArrayByKey(
	indexToSearch: number,
	arrayLength: number,
	key: number
): number {
	if (arrayLength === 0) return indexToSearch;
	if (indexToSearch >= arrayLength) return -1;
	const shuffledArr = getShuffledIndices(arrayLength, key);
	return shuffledArr.indexOf(indexToSearch);
}
