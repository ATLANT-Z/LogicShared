import {reactive} from "vue";
import {User} from "@/_shared/models/user";
import {translateService} from "@/_shared/services/translate.service";

export class UserService {
	_currUser: User | undefined;

	set CurrUser(user) {
		this._currUser = user;
		if (user) {
			translateService.CurrLang = user.locale;
		}
	}

	get CurrUser() {
		return this._currUser;
	}

	logout() {
		this.CurrUser = undefined;
	}
}

export const userService = reactive(new UserService());
