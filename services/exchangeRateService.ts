import {Currency} from "@shared/models/money/currency";

type AppUsedCurrencyList = Array<Currency>;

class ExchangeRateService {
	_sourceTarget: Currency = Currency.UAH;

	get SourceTarget() {
		return this._sourceTarget;
	}

	set SourceTarget(val) {
		this._sourceTarget = val;
	}

	usedCurrencyList: AppUsedCurrencyList = [Currency.UAH, Currency.USD];
}

export const exchangeRateService = new ExchangeRateService();
