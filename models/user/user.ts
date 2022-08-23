import {Jsonable} from "@shared/models/tools/tools";
import {DictLanguage} from "@shared/services/translate.service";
import {TAX_STATUS} from "@models/logReg";
import {Balance} from "@shared/models/money/money";
import {Region} from "@shared/models/region";
import {PersonNames} from "@shared/models/user/types";
import {Type} from "class-transformer";

enum BAN_REASON {
	debt = 'debt',
	price = 'price',
	agreement = 'agreement'
}


export enum UserRole {
	ROLE_COUNTERPARTY = 'ROLE_COUNTERPARTY',
	ROLE_MANAGER = 'ROLE_MANAGER'
}

export class User extends Jsonable<User>() {
	id: string;
	email: string;
	phone: string;

	@Type(() => PersonNames)
	name: PersonNames;
	locale: DictLanguage;

	@Type(() => Customer)
	customer: Customer;
	@Type(() => Company)
	company: Company;

	roles: UserRole[];

	get IsManager() {
		return this.roles.some(el => el === UserRole.ROLE_MANAGER)
	}

	get DisplayName() {
		return this.IsManager ? this.name.FullName : this.company.name;
	}

	// get DefaultBalance() {
	// 	return this.customer.balances.find(el => el.money.currency === 'USD')?.money || this.customer.balances[0].money;
	// }
}

export class Customer {
	externalId: string;
	curator: Curator;
	bans: BAN_REASON[];
	balances: Balance[];
}

export interface Curator {
	name: string;
	photoUrl?: string;
	phones: string[];
	emails: string[];
}

export class Company {
	@Type(() => Region)
	region?: Region;

	// УЗнать когда его может не быть
	name?: string;
	taxStatus: TAX_STATUS;
	usreou?: string;
	itn?: string;
	url?: string;
}
