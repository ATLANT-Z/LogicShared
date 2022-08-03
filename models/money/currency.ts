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
	amount: number;
	sourceCurrency: Currency;
	targetCurrency: Currency;
	paymentType: PAYMENT_TYPE;
}
