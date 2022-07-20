// import lang from '@/lang/lang.json';
import jsonDictionary from '@/lang/lang';

import {MessageProps} from "@vuelidate/validators";
import {reactive} from "vue";
import API from "@/http/API";
import {userService} from "@/_shared/services/user.service";
import {VueRef} from "@/_shared/models/tools/tools";
import {isExist} from "@shared/models/view/tools";
import {authService} from "@shared/services/auth.service";

type FullDictionary = typeof jsonDictionary;
export type DictionaryWord = keyof FullDictionary;

export type DictLanguage = 'ru' | 'uk';
export type DefaultLanguage = Extract<DictLanguage, 'ru'>;
type Dictionary = Record<DictionaryWord, string>;

type UserUnderstandableLanguage = string;
type AppUsedLanguages = Record<DictLanguage, UserUnderstandableLanguage>;
type AppUsedLanguageList = Array<{ key: DictLanguage, value: UserUnderstandableLanguage }>;

export type ILocaleableValue<Value = string, Keys extends string = DictLanguage> = {
	[Key in Keys]?: Value | undefined | null
} & {
	[Key in DefaultLanguage]: Value
}

export class LocaleableValue<T = string> implements ILocaleableValue<T> {
	@VueRef(true) ru: T;
	@VueRef(true) uk?: T | undefined | null;

	get Value() {
		return isExist(this[translateService.CurrLang]) ? this[translateService.CurrLang]
			: isExist(this[translateService.defaultLang]) ? this[translateService.defaultLang]
				: '';
	}

	toString() {
		return '' + this.Value
	}

	contains(val: T) {
		return this.ru === val || this.uk === val;
	}
}

class TranslateService {
	private storageKey = 'currentLanguage';
	defaultLang: DefaultLanguage = 'ru';

	private _currLang: DictLanguage;

	get CurrLang(): DictLanguage {
		return this._currLang;
	}

	set CurrLang(val: DictLanguage) {
		if (val === this._currLang) return;

		this._currLang = val;

		this.rememberLang(val);
		this.setDictionary(val);
	}

	private readonly fullDictionary: FullDictionary;
	private dictionary: Dictionary;

	private readonly usedLanguageMap: AppUsedLanguages = {
		ru: 'РУС',
		uk: 'УКР',
	}
	usedLangList: AppUsedLanguageList;

	constructor() {
		this.fullDictionary = jsonDictionary;
		this.usedLangList = Object.entries(this.usedLanguageMap).map(el => {
			return {key: el[0] as DictLanguage, value: el[1]};
		});

		this.CurrLang = this.getStoreLang() || 'uk';
	}

	getWord(word: DictionaryWord, props?: Partial<MessageProps>): string {
		if (!word) return '';

		if (!this.dictionary[word]) {
			console.warn('Translate: There is no translation for this word', word);
			return 'Key - ' + word;
		}

		let translatedWord;
		if (props?.$params)
			translatedWord = this.addParamsToStr(this.dictionary[word], props.$params)
		else
			translatedWord = this.dictionary[word];

		return translatedWord;
	}

	private addParamsToStr(str: string, params: any) {
		// console.log(props);
		Object.keys(params).map(key => {
			str = str.replaceAll("{" + key + "}", params[key]);
		})
		return str;
	}

	private setDictionary(currLang: DictLanguage) {
		const dict = {};
		Object.keys(jsonDictionary).forEach(word => dict[word] = this.fullDictionary[word][currLang] || this.fullDictionary[word][this.defaultLang]);
		this.dictionary = dict as Dictionary;

		console.log(`Словарь инициализирован, содержит ${Object.keys(this.dictionary).length} слов`)
	}

	private rememberLang(val: DictLanguage) {
		localStorage.setItem(this.storageKey, val);
		if (!authService.isAuth) return
		userService.getUser()
			.then(user => {
				if (!user) return;
				// TODO Проверить, вроде повтор проверки?
				if (user.locale === val) return;
				return API.Account.setUserLocale(val);
			});
	}


	private getStoreLang(): DictLanguage | undefined {
		const storageLang = localStorage.getItem(this.storageKey) as DictLanguage;
		return this.usedLangList.find(el => el.key === storageLang)?.key;
	}

	private getSystemLanguage(): DictLanguage | undefined {
		const userLang: string = window.navigator['language'] || window.navigator['userLanguage'];
		return this.usedLangList.find(el => userLang.includes(el.key!))?.key
	}
}

export const translateService = reactive(new TranslateService());
