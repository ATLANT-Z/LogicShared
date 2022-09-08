import {RouteLocationNormalizedLoaded, RouteLocationRaw} from "vue-router";

export type IUiSelectValue = {
	model: string | number,
	show: string,
	show2?: string,
}

export type ExtractKeys<T extends { [k: string]: any }> = T extends infer G ? `${(string & keyof G)}` : never;
export type ExtractEnumValues<E extends { [k: string]: any }> = E[ExtractKeys<E>];

export type MyObject = Record<string, any>;

export type VueLink = RouteLocationRaw;
export type VueRoute = RouteLocationNormalizedLoaded;
