import jsonDictionary from '@/lang/lang';

import API from "@/http/API";
import {FullDictionary} from "@shared/models/translate/types";
import {reactive} from "vue";
import {translateService} from "@shared/services/translate/translate.service";

export class DictionaryService {
	dictionary: FullDictionary = jsonDictionary;

	getDictionary() {
		API.Shared.Export.getTranslations().then(dict => {
			this.dictionary = dict;
			translateService.FullDictionary = this.dictionary;
		})
	}
}

export const dictionaryService = reactive(new DictionaryService());
