import {Jsonable, VueRef} from "@shared/models/tools/tools";
import {isExist} from "@shared/models/view/tools";
import {translateService} from "@shared/services/translate/translate.service";
import {ILocaleableValue} from "@shared/models/translate/types";

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
