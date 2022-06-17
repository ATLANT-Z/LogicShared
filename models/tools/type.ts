export type IUiSelectValue = {
	show: any,
	model: any
}

export type ExtractKeys<T extends { [k: string]: any }> = T extends infer G ? `${(string & keyof G)}` : never;
export type ExtractEnumValues<E extends { [k: string]: any }> = E[ExtractKeys<E>];

export type MyObject = Record<string, any>;
