import jsonDictionary from "@/lang/lang";

export type FullDictionary = typeof jsonDictionary;
export type DictionaryWord = keyof FullDictionary;

export type DictLanguage = 'ru' | 'uk';
export type DefaultLanguage = Extract<DictLanguage, 'ru'>;
export type DefaultSecondLanguage = Extract<DictLanguage, 'uk'>;

export type Dictionary = Record<DictionaryWord, string>;

type UserUnderstandableLanguage = string;
export type AppUsedLanguages = Record<DictLanguage, UserUnderstandableLanguage>;
export type AppUsedLanguageList = Array<{ key: DictLanguage, value: UserUnderstandableLanguage }>;

export type ILocaleableValue<Value = string, Keys extends string = DictLanguage> = {
	[Key in Keys]?: Value | undefined | null
} & {
	[Key in DefaultLanguage]: Value
}
