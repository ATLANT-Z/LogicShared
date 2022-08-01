import {Jsonable} from "@/_shared/models/tools/tools";
import {Transform} from "class-transformer";
import {userService} from "@/_shared/services/user.service";
import {vueTools} from "@/_shared/services/vueToolsProvider.service";
import {reactive} from "vue";
import {routeHelper} from "@shared/helpers/route.helper";
import API from "@/http/API";


import {LogForm} from "@models/logReg";
import {ApiResponse} from "@shared/http/abstract/serverApi";
import {errorService} from "@shared/services/error.service";

export class AuthToken extends Jsonable<AuthToken>() {
	private token: string;

	@Transform(({value}) => new Date(value * 1000), {toClassOnly: true})
	private expiresAt: Date;

	get Value() {
		if (!this.token) return '';
		if (this.expiresAt > new Date()) return this.token
		return '';
	}

	getHeader() {
		const val = this.Value;
		return val ? 'Bearer ' + val : '';
	}
}

class AuthService {
	private tokenStoreKey = 'authToken';
	private token: AuthToken | null = null;

	get Token() {
		return this.token;
	}

	set Token(token) {
		this.token = token;
	}

	get isAuth(): boolean {
		return !!this.Token?.Value;
	}

	get isToken(): boolean {
		return !!this.Token;
	}

	constructor() {
		this.setTokenFromLocalStorage();
		if (!this.isAuth && this.isToken) {
			errorService.authError();
			this.logOut();
		}
	}

	private setTokenFromLocalStorage() {
		const data: object = JSON.parse(localStorage.getItem(this.tokenStoreKey) as string);
		if (data)
			this.Token = AuthToken.fromJson(data);
	}

	logInCredentials(form: LogForm) {
		return API.Account.Sign.In.credentials(form).then((res: ApiResponse) => {
			this.setToken(res.data);
		});
	}

	logInToken(token: string) {
		return API.Account.Sign.In.token(token).then((res: ApiResponse) => {
			this.setToken(res.data);
		});
	}

	logOut() {
		this.Token = null;
		userService.setUser(null);
		localStorage.removeItem(this.tokenStoreKey);

		vueTools.router.push({name: routeHelper.names['logIn']}).then(console.log);
	}

	private setToken(data: object) {
		localStorage.setItem(this.tokenStoreKey, JSON.stringify(data));
		this.Token = AuthToken.fromJson(data);
	}
}

export const authService = reactive(new AuthService());
