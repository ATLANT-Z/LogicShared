import {Jsonable} from "@/_shared/models/tools/tools";
import {Transform} from "class-transformer";
import {userService} from "@/_shared/services/user.service";
import {vueTools} from "@/_shared/services/vueToolsProvider.service";
import {reactive} from "vue";

export class AuthToken extends Jsonable<AuthToken>() {
	private token: string;

	get Value() {
		if (!this.token) return '';
		if (this.expiresAt > new Date()) return this.token
		return '';
	}

	@Transform(({value}) => new Date(value * 1000), {toClassOnly: true})
	expiresAt: Date;

	getHeader() {
		const val = this.Value;
		return val ? 'Bearer ' + val : '';
	}
}

class AuthService {
	private tokenStoreKey = 'authToken';
	private token: AuthToken | undefined;

	get Token() {
		return this.token;
	}

	set Token(token) {
		this.token = token;
	}

	get isAuth(): boolean {
		return !!this.Token?.Value;
	}

	constructor() {
		this.setTokenFromLocalStorage();
	}

	private setTokenFromLocalStorage() {
		const data: object = JSON.parse(localStorage.getItem(this.tokenStoreKey) as string);
		if (data)
			this.Token = AuthToken.fromJson(data);
	}

	logOut() {
		this.Token = undefined;
		userService.CurrUser = undefined;
		localStorage.removeItem(this.tokenStoreKey);
		vueTools.router.push({name: 'logIn'}).then(console.log);
	}

	setToken(data: object) {
		localStorage.setItem(this.tokenStoreKey, JSON.stringify(data));
		this.Token = AuthToken.fromJson(data);
	}
}

export const authService = reactive(new AuthService());
