import {errorService} from "@/_shared/services/error.service";
import {ExtractKeys} from "@/_shared/models/tools/type";
import {authService} from "@services/auth/auth.service";
import {vueTools} from "@shared/services/vueToolsProvider.service";
import {routeHelper} from "@shared/helpers/route.helper";

type HandlerPrefix = 'handle_';
const handlerPrefix: HandlerPrefix = 'handle_';
/// Заставляет имплементировать обработчики на каждую запись enum
/// Так НЕ работает: `${HandlerPrefix}${ExtractKeys<E>}`
type EnumHandler<E extends Record<string, any>> = Record<`handle_${ExtractKeys<E>}`, (...args: any) => any>

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
	MaintenanceMode = 503,
}

export enum FORBIDDEN_REASON {
	ACCOUNT_SIGN_IN_WITH_INVALID_CREDENTIALS = 1,
	ACCOUNT_SIGN_IN_WHEN_DISABLED = 2,
	ACCOUNT_SIGN_IN_WHEN_CUSTOMER_AGREEMENT_BAN = 24,
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
	ORDER_CHECKOUT_WITHOUT_ACTIVE_PRODUCTS = 23,
}

export class HttpErrorService implements IErrorHandler<typeof HTTP_ERROR_CODE> {
	handle(errorCode: HTTP_ERROR_CODE, code?: any) {
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
		errorService.sessionExpiredError();
		authService.logOut(true);
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
		return errorService.addError('Не удалось выполнить запрос.');
	}

	handle_Forbidden(reason: any): any {
		console.warn('reason', FORBIDDEN_REASON[reason]);
	}

	handle_MaintenanceMode(args: any): any {
		vueTools.router?.push({name: routeHelper.names['maintenance']});
	}
}

export const httpErrorService = new HttpErrorService();
