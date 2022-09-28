import {formatDistance} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import ukLocale from 'date-fns/locale/uk';

import {translateService} from "@shared/services/translate/translate.service";

import {getUnixTime as fnsGetUnixTime} from 'date-fns'
import {DictLanguage} from "@shared/models/translate/types";

export class FormatTimeHelper {
	private static localesMap: Record<DictLanguage, Locale> = {
		ru: ruLocale,
		uk: ukLocale
	}

	static isLastMinute(date: Date | number): boolean {
		return fnsGetUnixTime(date) >= fnsGetUnixTime(Date.now()) - 60;
	}

	static DateFromSec(sec: number) {
		return new Date(sec * 1000);
	}

	static getDistanceFromNow(date: Date | number): string {
		if (this.isLastMinute(date)) {
			return translateService.getWord('lessThan1Min');
		}

		return formatDistance(date, Date.now(), {
			includeSeconds: true,
			addSuffix: true,
			locale: this.localesMap[translateService.CurrLang]
		});
	}
}
