import "@/_shared/http/axios.config";
import AbstractApi from "@/_shared/http/abstract/abstractApi";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {HTTP_ERROR_CODE, httpErrorService} from "@/_shared/services/httpError.service";
import {authService} from "@/_shared/services/auth.service";
import {errorService} from "@/_shared/services/error.service";

export type ApiResponse = { data: any, response: AxiosResponse }
export type ApiResponseError = { status: any, code: number, data: any, response: AxiosResponse }

class AxiosErrService {
	private static getResponse(error: any): AxiosResponse {
		const response: AxiosResponse = error.response;
		if (response) {
			return response
		} else {
			throw httpErrorService.handle(HTTP_ERROR_CODE.ImTeapot);
		}
	}

	/// Any status codes that falls outside the range of 2xx cause this function to trigger
	/// Do something with response error
	static handleResponseError(error: any) {
		const response = AxiosErrService.getResponse(error);

		const {data, status} = response;

		httpErrorService.handle(status, data.code);
		// console.warn('Error response', response);
		console.warn('error', response.config.url, data);

		return Promise.reject({status, code: data.code, data: data.data, response});
	}
}

export default abstract class ServerApi extends AbstractApi {
	protected baseUrl: string = '';

	constructor(private parentApi?: ServerApi) {
		super();
	}

	protected get FullUrl() {
		return this.parentApi ? this.parentApi.FullUrl + '/' + this.baseUrl : this.baseUrl;
	}

	private addTokenIfRequired(config: AxiosRequestConfig) {
		if (config.requireAuth) {
			if (authService.isAuth) {
				config.headers = {};
				config.headers['Authorization'] = authService.Token!.getHeader();
			} else {
				console.warn('Пользователь не залогинен');
				errorService.addError('Пожалуйста, залогинтесь');
				authService.logOut();
			}
		}
	}

	private handleConfig(config: AxiosRequestConfig): AxiosRequestConfig {
		const _config: AxiosRequestConfig = {
			requireAuth: true,
			...config
		}

		this.addTokenIfRequired(_config);

		return _config;
	}

	private handleResponse(response: AxiosResponse): ApiResponse {
		console.log('response', response.config.url, response);
		return {data: response.data['data'], response};
	}

	get(url: string, config: AxiosRequestConfig = {}) {
		return axios.get(this.FullUrl + '/' + url, this.handleConfig(config))
			.then(this.handleResponse)
			.catch(AxiosErrService.handleResponseError)
	}

	post(url: string, body: Record<string, any>, config: AxiosRequestConfig = {}) {
		return axios.post(this.FullUrl + '/' + url, body, this.handleConfig(config))
			.then(this.handleResponse)
			.catch(AxiosErrService.handleResponseError)
	}
}
