export class Preference<T> {
	private static storageKey = 'preference'

	get Value(): T {
		return this.getValFromStorage() || this.defaultValue;
	}

	set Value(val) {
		this.setValToStorage(val);
	}

	private getValFromStorage(): T | null {
		const storage = JSON.parse(localStorage.getItem(Preference.storageKey) as string);
		if (!storage || !storage[this.id]) return null;

		return storage[this.id];
	}

	private setValToStorage(val: T) {
		let storage: Record<string, any> = JSON.parse(localStorage.getItem(Preference.storageKey) as string);
		if (!storage) storage = {};
		storage[this.id] = val;
		localStorage.setItem(Preference.storageKey, JSON.stringify(storage));
	}

	constructor(private id: string, private defaultValue: T) {}
}
