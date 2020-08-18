export function deepEqual(x: any, y: any) {
	if (x === y) {
		return true;
	}

	if (
		typeof x === "object" &&
		x !== null &&
		typeof y === "object" &&
		y !== null
	) {
		if (x instanceof Date && y instanceof Date) {
			return x.getTime() === y.getTime();
		}

		if (Object.keys(x).length !== Object.keys(y).length) {
			return false;
		}

		for (const prop in x) {
			if (x.hasOwnProperty(prop)) {
				if (y.hasOwnProperty(prop)) {
					if (!deepEqual(x[prop], y[prop])) {
						return false;
					}
				} else {
					return false;
				}
			}
		}

		return true;
	}

	return false;
}
