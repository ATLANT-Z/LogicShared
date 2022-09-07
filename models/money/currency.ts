export enum Currency {
	USD = 'USD',
	UAH = 'UAH'
}

export enum PAYMENT_TYPE {
	cash = 'cash',
	cashDeferred = 'cashDeferred',
	cashless = 'cashless',
	cashlessDeferred = 'cashlessDeferred',
}

export interface CurrencyRate {
	paymentType: PAYMENT_TYPE;
	sourceCurrency: Currency;
	targetCurrency: Currency;
	amount: number;
}
