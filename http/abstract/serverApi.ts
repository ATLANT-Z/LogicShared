import "@/_shared/http/axios.config";
import AbstractApi from "@/_shared/http/abstract/abstractApi";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {HTTP_ERROR_CODE, httpErrorService} from "@/_shared/services/httpError.service";
import {authService} from "@services/auth/auth.service";
import {errorService} from "@/_shared/services/error.service";
import {AppModeHelper} from "@shared/helpers/appMode.helper";

export type ApiResponse = { data: any, response: AxiosResponse }
export type ApiResponseError = { status: HTTP_ERROR_CODE, code: number, data: any, response: AxiosResponse }

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

		console.log({status, code: data.code, data: data.data, response})

		return Promise.reject({status, code: data.code, data: data.data, response});
	}
}

export default abstract class ServerApi extends AbstractApi {
	protected baseUrl: string = '';

	private timeMap: any = {}

	protected get FullBaseUrl() {
		return this.parentApi ? this.parentApi.FullBaseUrl + '/' + this.baseUrl : this.baseUrl;
	}

	constructor(private parentApi?: ServerApi) {
		super();
	}

	protected post(url: string, body: Record<string, any>, config: AxiosRequestConfig = {}) {
		this.startTime(url);
		return axios.post(this.getFullUrl(url), body, this.handleConfig(config))
			.then(this.handleResponse.bind(this))
			.catch(AxiosErrService.handleResponseError)
	}

	protected get(url: string, config: AxiosRequestConfig = {}) {
		this.startTime(url);
		return axios.get(this.getFullUrl(url), this.handleConfig(config))
			.then(this.handleResponse.bind(this))
			.catch(AxiosErrService.handleResponseError)
	}

	private getFullUrl(url) {
		return url ? this.FullBaseUrl + '/' + url : this.FullBaseUrl;
	}

	private handleResponse(response: AxiosResponse): ApiResponse {
		// console.log('response', response.config.url, this.endTime(response.config.url), response);
		console.log('response', response.config.url, response);
		return {data: response.data['data'], response};
	}

	private startTime(url) {
		// const fullUrl = this.getFullUrl(url);
		// if (this.timeMap[fullUrl])
		// 	return console.warn('Временная метка ' + this.getFullUrl(url) + ' уже существует');
		//
		// this.timeMap[fullUrl] = window.performance.now();
	}

	private endTime(fullUrl) {
		if (!this.timeMap[fullUrl])
			return 'Временная метка ' + fullUrl + ' не существует';

		const res = window.performance.now() - this.timeMap[fullUrl] + 'ms';
		delete this.timeMap[fullUrl];
		return res;
	}

	private handleConfig(config: AxiosRequestConfig): AxiosRequestConfig {
		const _config: AxiosRequestConfig = {
			requireAuth: true,
			...config
		}

		this.addTokenIfRequired(_config);

		return _config;
	}

	private addTokenIfRequired(config: AxiosRequestConfig) {
		if (config.requireAuth) {
			if (authService.isAuth) {
				config.headers = {};
				config.headers['Authorization'] = authService.Token!.getHeader();
			} else {
				authService.logOut();
			}
		}
	}
}
