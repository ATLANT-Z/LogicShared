import {ILocaleableValue, Jsonable} from "@/_shared/models/tools/tools";
import {DictLanguage, LocaleableValue} from "@/_shared/services/translate.service";
import {Currency} from "@shared/models/money/currency";

enum BAN_REASON {
	debt = 'debt',
	price = 'price',
	agreement = 'agreement'
}

export class Region extends Jsonable<Region>() {
	id: string;
	@ILocaleableValue() name: LocaleableValue;
}

export class User extends Jsonable<User>() {
	email: string;
	phone: string;
	name: UserNames;
	locale: DictLanguage;
	customer: Customer;

	get DefaultBalance() {
		return this.customer.balances.find(el => el.money.currency === 'USD')?.money || this.customer.balances[0].money;
	}

}

type UserNames = {
	firstName: string,
	middleName: string,
	lastName: string,
}

export class Customer {
	bans: BAN_REASON[];
	balances: Balance[];
}

export interface Balance {
	money: Money;
}

export interface Money {
	amount: number;
	currency: Currency;
}
