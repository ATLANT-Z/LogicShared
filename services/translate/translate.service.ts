// import lang from '@/lang/lang.json';

import {MessageProps} from "@vuelidate/validators";
import {reactive} from "vue";
import {BehaviorSubject} from "rxjs";
import {LocaleableValue} from "@shared/models/translate/localeableValue";
import {
	AppUsedLanguageList,
	AppUsedLanguages,
	DefaultLanguage,
	DefaultSecondLanguage,
	Dictionary,
	DictionaryWord,
	DictLanguage,
	FullDictionary
} from "@shared/models/translate/types";
import API from "@/http/API";
import {dictionaryService} from "@shared/services/translate/dictionary.service";

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

	private fullDictionary: FullDictionary;
	private dictionary: Dictionary;

	private readonly usedLanguageMap: AppUsedLanguages = {
		ru: 'РУС',
		uk: 'УКР',
	}
	usedLangList: AppUsedLanguageList;

	get FullDictionary() {
		return this.fullDictionary;
	}

	set FullDictionary(dict) {
		this.fullDictionary = dict;
		this.setDictionary(this.CurrLang);
	}

	constructor() {
		this.fullDictionary = dictionaryService.dictionary;
		this.usedLangList = Object.entries(this.usedLanguageMap).map(el => {
			return {key: el[0] as DictLanguage, value: el[1]};
		});

		this.setCurrLang(this.getDefaultLang());
	}

	getDefaultLang() {
		return this.getStoreLang() || 'uk';
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

		if (!this.FullDictionary[word]) {
			// console.warn('Translate: There is no translation for this word', word);
			return LocaleableValue.fromJson({ru: 'Key - ' + word});
		}

		if (props?.$params) {
			const rawLocaleable = {...this.FullDictionary[word]};
			Object.keys(rawLocaleable).forEach(key => {
				rawLocaleable[key] = this.addParamsToStr(rawLocaleable[key], props.$params);
			});
			return LocaleableValue.fromJson(rawLocaleable);
		} else {
			return LocaleableValue.fromJson(this.FullDictionary[word]);
		}
	}

	private addParamsToStr(str: string, params: any) {
		// console.log(props);
		Object.keys(params).forEach(key => {
			str = str.replaceAll("{" + key + "}", params[key]);
		})
		return str;
	}

	private setDictionary(currLang: DictLanguage) {
		const dict = {};
		Object.keys(this.FullDictionary).forEach(word => dict[word] = this.FullDictionary[word][currLang] || this.FullDictionary[word][this.defaultLang]);
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
