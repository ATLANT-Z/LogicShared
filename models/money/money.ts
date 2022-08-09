import {Currency} from "@shared/models/money/currency";

export interface Balance {
	money: Money;
}

export interface Money {
	amount: number;
	currency: Currency;
}
