import {uid} from "@/_shared/models/tools/tools";
import {reactive} from "vue";

export class MyError {
	id: string;

	constructor(public msg: string) {
		this.id = uid();
	}
}

export class ErrorService {
	private secondsShow: number = 7;
	errors: MyError[] = []

	isAuthErrorExist: boolean = false;

	sessionExpiredError() {
		this.isAuthErrorExist = true;
		setTimeout(() => {
			this.isAuthErrorExist = false;
		}, this.secondsShow * 1000);
		return this.addError('Ваша сессия истекла');

	}

	///TODO загнать все сообщения в переводчик.
	addError(str: string) {
		const newError = new MyError(str);
		this.errors.push(newError);
		this.setRemoveTimer(newError.id);
		return str;
	}

	private setRemoveTimer(id: string) {
		setTimeout(() => {
			const index = this.errors.findIndex(el => el.id === id);
			this.errors.splice(index, 1);
		}, this.secondsShow * 1000);
	}
}

export const errorService = reactive(new ErrorService());
