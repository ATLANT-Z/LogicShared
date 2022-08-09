import {reactive} from "vue";
import {User} from "@shared/models/user/user";
import API from "@/http/API";
import {BehaviorSubject} from "rxjs";
import {authService} from "@shared/services/auth.service";

export class UserService {
	currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

	constructor() {
		authService.currentToken
			.subscribe((token) => {
				if (token) this.fetchUser();
				else if (!token) this.clearUser();
			})
	}

	private fetchUser() {
		API.Account.getCurrenUser().then(user => {
			this.currentUser.next(user);
		})
	}

	private clearUser() {
		this.currentUser.next(null);
	}
}

export const userService = reactive(new UserService());
