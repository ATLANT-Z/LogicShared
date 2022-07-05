export enum PROMISE_STATE {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
}

export function promiseState(p: Promise<any>): Promise<PROMISE_STATE | undefined> {
	const emptyObj = {};
	return Promise.race([p, emptyObj])
		.then(
			val => !p ? undefined : (val === emptyObj) ? PROMISE_STATE.PENDING : PROMISE_STATE.FULFILLED,
			() => PROMISE_STATE.REJECTED
		);
}

export class PromiseWrapper<T = any> {
	private promiseState: PROMISE_STATE;

	get IsPending() {
		return this.promiseState === PROMISE_STATE.PENDING;
	}

	get IsFulfilled() {
		return this.promiseState === PROMISE_STATE.FULFILLED;
	}

	get IsRejected() {
		return this.promiseState === PROMISE_STATE.REJECTED;
	}

	constructor(public value: Promise<T>) {
		this.promiseState = PROMISE_STATE.PENDING
		value
			.then(data => {
				this.promiseState = PROMISE_STATE.FULFILLED;
				return data;
			})
			.catch(err => {
				this.promiseState = PROMISE_STATE.REJECTED;
				throw err;
			})
	}
}
