import {Currency} from "@shared/models/money/currency";

type AppUsedCurrencyList = Array<Currency>;

class ExchangeRateService {
	_sourceTarget: Currency = "USD";

	get SourceTarget() {
		return this._sourceTarget;
	}

	set SourceTarget(val) {
		this._sourceTarget = val;
	}

	usedCurrencyList: AppUsedCurrencyList = ["UAH", 'USD'];
}

export const exchangeRateService = new ExchangeRateService();
