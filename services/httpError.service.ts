import {errorService} from "@/_shared/services/error.service";
import {ExtractKeys} from "@/_shared/models/tools/type";
import {authService} from "@shared/services/auth.service";

type HandlerPrefix = 'handle_';
const handlerPrefix: HandlerPrefix = 'handle_';
/// Заставляет имплементировать обработчики на каждую запись enum
/// Так НЕ работает: `${HandlerPrefix}${ExtractKeys<E>}`
type EnumHandler<E> = Record<`handle_${ExtractKeys<E>}`, (...args: any) => any>

///Тип интерфейса обработчика ошибок Enum
export type IErrorHandler<Enum, EKey extends keyof Enum = keyof Enum> = {
	handle(errorCode: Enum[EKey], code?: any, subHandler?: IErrorHandler<any>)
} & EnumHandler<Enum>


///Default
/// Каждая ошибка требует свой метод в общем обработчике
export enum HTTP_ERROR_CODE {
	Server = 400,
	NotFound = 404,
	Unauthorized = 401,
	Forbidden = 403,
	ImTeapot = 418,
	UnprocessableEntity = 422,
	TooManyRequests = 429,
}

export enum FORBIDDEN_REASON {
	ACCOUNT_SIGN_IN_WITH_INVALID_CREDENTIALS = 1,
	ACCOUNT_SIGN_IN_WHEN_DISABLED = 2,
	ACCOUNT_SIGN_IN_WHEN_CUSTOMER_OVERDUE_BAN = 3,
	ACCOUNT_PASSWORD_RESET_COMPLETE_WITH_INVALID_TOKEN = 4,
	ACCOUNT_PASSWORD_UPDATE_WITH_INVALID_CURRENT_PASSWORD = 5,
	ACCOUNT_MANAGER_ADD_WITH_EXISTS_EMAIL = 6,
	ACCOUNT_MANAGER_ADD_WITH_EXISTS_PHONE = 7,
	ACCOUNT_MANAGER_REMOVE_WITH_INVALID_ID = 8,
	ACCOUNT_TOKEN_INVALID_ID = 9,
	ACCOUNT_REGION_CURRENT_UNKNOWN = 10,
	CATALOG_PRODUCT_INVALID_ID = 11,
	CATALOG_PRODUCT_CART_MISSING_ID = 12,
	CATALOG_PRODUCT_CART_REMOVE_WITH_OUT_OF_REACH_QUANTITY = 13,
	CATALOG_PRODUCT_FAVORITE_ADD_EXISTS_ID = 14,
	CATALOG_PRODUCT_FAVORITE_REMOVE_WITH_ID_NOT_IN_LIST = 15,
	ACCOUNT_RECIPIENT_INVALID_ID = 16,
	ACCOUNT_ACCESS_TOKEN_INVALID = 17,
	CATALOG_PRODUCT_INVALID_SLUG = 18,
	CATALOG_PRODUCT_CART_ADD_UNACCEPTABLE_PRODUCT = 19,
	ACCOUNT_RECIPIENT_DELIVERY_ADD_WITH_INVALID_METHOD_PARAMETERS = 20,
	ACCOUNT_RECIPIENT_DELIVERY_INVALID_ID = 21,
	ORDER_CHECKOUT_WITH_OUT_OF_REACH_ORDER_PRODUCT_QUANTITY = 22,
}

export class HttpErrorService implements IErrorHandler<typeof HTTP_ERROR_CODE> {
	http403Service = new Http403service();

	handle(errorCode: HTTP_ERROR_CODE, code?: any, subHandler?: IErrorHandler<any>) {
		const handlerName = handlerPrefix + HTTP_ERROR_CODE[errorCode];

		if (this[handlerName])
			return this[handlerName](code)
		else
			throw 'Не смог обработать ошибку, код:' + errorCode;
	}

	handle_Server(): any {
		return errorService.addError('Что-то пошло не так, обратитесь, пожалуйста, в тех поддержку');
	}

	handle_Unauthorized(): any {
		if (errorService.isAuthErrorExist) return '';
		authService.logOut(true);
		return errorService.sessionExpiredError();
	}

	handle_NotFound(args: any): any {
		return console.error('Сервер не отвечает, или такого маршрута не существует', args)
	}

	handle_UnprocessableEntity(): any {
		return errorService.addError('Сорян, мой косяк. Скоро мне прилетит по шапке и я всё исправлю');
	}

	handle_TooManyRequests(): any {
		return errorService.addError('Воу-воу. Не так быстро. Попробуйте повторить запрос позже');
	}

	handle_ImTeapot(): any {
		return errorService.addError('CORS не включены');
	}

	handle_Forbidden(reason: any, subHandler?: Http403service): any {
		if (subHandler)
			return subHandler.handle(reason);
		else
			return this.http403Service.handle(reason)
	}
}

///forbidden service
class Http403service implements IErrorHandler<typeof FORBIDDEN_REASON> {
	handle(errorCode: FORBIDDEN_REASON) {
		const handlerName = handlerPrefix + FORBIDDEN_REASON[errorCode];

		if (this[handlerName])
			return this[handlerName]()
		else
			throw 'Не смог обработать ошибку, код:' + errorCode;
	}

	handle_ACCOUNT_SIGN_IN_WITH_INVALID_CREDENTIALS(): any {
		return errorService.addError('Логин или пароль недействительны');
	}

	handle_ACCOUNT_SIGN_IN_WHEN_DISABLED(): any {
		return errorService.addError('Менеджер пока не утвердил вашу заявку на регистрацию - пожалуйста, ожидайте');
	}

	handle_ACCOUNT_SIGN_IN_WHEN_CUSTOMER_OVERDUE_BAN() {
		return errorService.addError('Вследствие бездействия, ваш аккаунт ограничен');
	}

	handle_ACCOUNT_MANAGER_ADD_WITH_EXISTS_EMAIL(args: any) {
	}

	handle_ACCOUNT_MANAGER_ADD_WITH_EXISTS_PHONE(args: any) {
	}

	handle_ACCOUNT_MANAGER_REMOVE_WITH_INVALID_ID(args: any) {
	}

	handle_ACCOUNT_PASSWORD_RESET_COMPLETE_WITH_INVALID_TOKEN(args: any) {
	}

	handle_ACCOUNT_PASSWORD_UPDATE_WITH_INVALID_CURRENT_PASSWORD(args: any) {
	}

	handle_ACCOUNT_REGION_CURRENT_UNKNOWN(args: any) {
		console.warn('Пользователь находится за пределами Украины, получить область невозможно')
	}

	handle_ACCOUNT_TOKEN_REMOVE_WITH_INVALID_ID(args: any) {
	}

	handle_CATALOG_PRODUCT_CART_REMOVE_WITH_ID_NOT_IN_LIST(args: any) {
	}

	handle_CATALOG_PRODUCT_CART_REMOVE_WITH_OUT_OF_REACH_QUANTITY(args: any) {
	}

	handle_CATALOG_PRODUCT_FAVORITE_ADD_EXISTS_ID(args: any) {
	}

	handle_CATALOG_PRODUCT_FAVORITE_REMOVE_WITH_ID_NOT_IN_LIST(args: any) {
	}

	handle_CATALOG_PRODUCT_INVALID_ID(args: any) {
	}

	handle_ACCOUNT_ACCESS_TOKEN_INVALID(args: any): any {
	}

	handle_ACCOUNT_RECIPIENT_DELIVERY_ADD_WITH_INVALID_METHOD_PARAMETERS(args: any): any {
	}

	handle_ACCOUNT_RECIPIENT_DELIVERY_INVALID_ID(args: any): any {
	}

	handle_ACCOUNT_RECIPIENT_INVALID_ID(args: any): any {
	}

	handle_ACCOUNT_TOKEN_INVALID_ID(args: any): any {
	}

	handle_CATALOG_PRODUCT_CART_ADD_UNACCEPTABLE_PRODUCT(args: any): any {
	}

	handle_CATALOG_PRODUCT_CART_MISSING_ID(args: any): any {
	}

	handle_CATALOG_PRODUCT_INVALID_SLUG(args: any): any {
	}

	handle_ORDER_CHECKOUT_WITH_OUT_OF_REACH_ORDER_PRODUCT_QUANTITY(args: any): any {
	}
}

export const httpErrorService = new HttpErrorService();
