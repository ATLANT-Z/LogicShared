// import lang from '@/lang/lang.json';
import jsonDictionary from '@/lang/lang';

import {MessageProps} from "@vuelidate/validators";
import {reactive} from "vue";
import {Jsonable, VueRef} from "@/_shared/models/tools/tools";
import {isExist} from "@shared/models/view/tools";
import {BehaviorSubject} from "rxjs";

type FullDictionary = typeof jsonDictionary;
export type DictionaryWord = keyof FullDictionary;

export type DictLanguage = 'ru' | 'uk';
type DefaultLanguage = Extract<DictLanguage, 'ru'>;
type DefaultSecondLanguage = Extract<DictLanguage, 'uk'>;
type Dictionary = Record<DictionaryWord, string>;

type UserUnderstandableLanguage = string;
type AppUsedLanguages = Record<DictLanguage, UserUnderstandableLanguage>;
type AppUsedLanguageList = Array<{ key: DictLanguage, value: UserUnderstandableLanguage }>;

export type ILocaleableValue<Value = string, Keys extends string = DictLanguage> = {
	[Key in Keys]?: Value | undefined | null
} & {
	[Key in DefaultLanguage]: Value
}

export class LocaleableValue<T = string> extends Jsonable<LocaleableValue>() implements ILocaleableValue<T> {
	@VueRef(true) ru: T;
	@VueRef(true) uk?: T | undefined | null;

	get Value() {
		const word: T | undefined | null = isExist(this[translateService.getCurrLang()]) ? this[translateService.getCurrLang()]
			: isExist(this[translateService.defaultLang]) ? this[translateService.defaultLang]
				: isExist(this[translateService.defaultSecondLang]) ? this[translateService.defaultSecondLang] : undefined;

		return isExist(word) ? word : '';
	}

	toString() {
		return '' + this.Value
	}

	contains(val: T | undefined | null) {
		return this.ru === val || this.uk === val;
	}
}

class TranslateService {
	private storageKey = 'currentLanguage';
	defaultLang: DefaultLanguage = 'ru';
	defaultSecondLang: DefaultSecondLanguage = 'uk';

	private currLang: DictLanguage;

	currLangOrigin: BehaviorSubject<DictLanguage> = new BehaviorSubject<DictLanguage>('uk');

	get CurrLang(): DictLanguage {
		return this.currLang;
	}

	getCurrLang(): DictLanguage {
		return this.currLang;
	}

	setCurrLang(val: DictLanguage) {
		this.currLang = val;

		this.rememberLang(val);
		this.setDictionary(val);
		this.currLangOrigin.next(val);
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

		this.setCurrLang(this.getStoreLang() || 'uk');
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

	getLocaleable(word: DictionaryWord, props?: Partial<MessageProps>): LocaleableValue {
		if (!word) LocaleableValue.fromJson({ru: ''});

		if (!this.fullDictionary[word]) {
			// console.warn('Translate: There is no translation for this word', word);
			return LocaleableValue.fromJson({ru: 'Key - ' + word});
		}

		if (props?.$params) {
			const rawLocaleable = {...this.fullDictionary[word]};
			Object.keys(rawLocaleable).forEach(key => {
				rawLocaleable[key] = this.addParamsToStr(rawLocaleable[key], props.$params);
			});
			return LocaleableValue.fromJson(rawLocaleable);
		} else {
			return LocaleableValue.fromJson(this.fullDictionary[word]);
		}
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
