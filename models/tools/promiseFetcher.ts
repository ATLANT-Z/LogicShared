import {PromiseWrapper} from "@shared/models/tools/promise";

export class PromiseFetcher<T> {
	promiseWrapper: PromiseWrapper<T>;
	source: (...args) => Promise<T>;
	sourceArgs: any[];

	constructor(source: (...args) => Promise<T>, ...sourceArgs) {
		this.source = source.bind(source.prototype);
		this.sourceArgs = sourceArgs;
	}

	getValue() {
		if ((this.promiseWrapper && this.promiseWrapper.IsFulfilled) || this.promiseWrapper?.IsPending) {
			return this.promiseWrapper.value;
		} else {
			this.promiseWrapper = new PromiseWrapper<T>(this.source(...this.sourceArgs));
			return this.promiseWrapper.value;
		}
	}
}
