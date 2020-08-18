export class ContentPath<MainObj extends {} = any> {
	private readonly prefix: string;
	public readonly relativePath: string;

	private addedPaths: Record<any, ContentPath<any> | undefined> = {};

	constructor(path?: string, absolutePath?: string) {
		this.prefix = absolutePath ?? "";
		this.relativePath = path ?? "";
	}

	add<K extends keyof MainObj>(str: K): ContentPath<MainObj[K]> {
		if (this.addedPaths[str]) {
			return this.addedPaths[str]!;
		}
		let path = this.relativePath;
		if (path) {
			path += ".";
		}
		path += str;
		const newPath = new ContentPath(path);
		this.addedPaths[str] = newPath;
		return newPath;
	}
}
