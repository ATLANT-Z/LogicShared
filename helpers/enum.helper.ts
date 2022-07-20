export class EnumHelper {
	private static extractStrKeys(ENUM: any) {
		return Object.keys(ENUM).filter(el => {
			return isNaN(+el)
		});
	}

	static getEnumMap(ENUM: any) {
		return this.extractStrKeys(ENUM).reduce((prev, curr) => {
			prev[curr] = curr;
			return prev
		}, {})
	}
}
