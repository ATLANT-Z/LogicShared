import {reactive} from "vue";
import {User} from "@/_shared/models/user";
import {translateService} from "@/_shared/services/translate.service";
import API from "@/http/API";
import {PromiseWrapper} from "@shared/models/tools/promise";
import {authService} from "@shared/services/auth.service";

export class UserService {
	private promiseWrapper: PromiseWrapper<User> | undefined;

	async getUser(): Promise<User | null> {
		if (!authService.isAuth) return null;

		if (!this.promiseWrapper || this.promiseWrapper.IsRejected) {
			this.promiseWrapper = new PromiseWrapper<User>(API.Account.getCurrenUser());
		}

		return this.promiseWrapper.value;
	}

	setUser(user: User | null) {
		if (user) translateService.CurrLang = user.locale;
		return user;
	}
}

export const userService = reactive(new UserService());
