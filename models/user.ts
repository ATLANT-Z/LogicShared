import {ILocaleableValue, Jsonable} from "@/_shared/models/tools/tools";
import {DictLanguage, LocaleableValue} from "@/_shared/services/translate.service";
import {Currency} from "@shared/models/money/currency";
import {TAX_STATUS} from "@models/logReg";

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
	name: PersonNames;
	locale: DictLanguage;
	customer: Customer;
	company: Company;


	get DefaultBalance() {
		return this.customer.balances.find(el => el.money.currency === 'USD')?.money || this.customer.balances[0].money;
	}

}

export type PersonNames = {
	firstName: string,
	middleName: string,
	lastName: string,
}

export class Customer {
	curator: Curator;
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

export interface Curator {
	name: string;
	photoUrl?: string;
	phones: string[];
	emails: string[];
}

export interface Company {
	region?: Region;
	name: string;
	taxStatus: TAX_STATUS;
	usreou?: string;
	itn?: string;
	url?: string;
}
