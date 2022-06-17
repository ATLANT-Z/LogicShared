declare module 'axios' {
	export interface AxiosRequestConfig {
		requireAuth?: boolean | undefined;
	}

	export interface AxiosResponse {
		response: this
	}
}

export default {}
