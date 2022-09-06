import {Jsonable} from "@shared/models/tools/tools";
import {DictLanguage} from "@shared/services/translate.service";
import {TAX_STATUS} from "@models/logReg";
import {Balance, Money} from "@shared/models/money/money";
import {Region} from "@shared/models/region";
import {PersonNames} from "@shared/models/user/types";
import {Type} from "class-transformer";
import {Currency} from "@shared/models/money/currency";

export enum BAN_REASON {
	debt = 'debt',
	price = 'price',
	agreement = 'agreement',
	overdue = 'overdue'
}


export enum UserRole {
	ROLE_COUNTERPARTY = 'ROLE_COUNTERPARTY',
	ROLE_MANAGER = 'ROLE_MANAGER',
	ROLE_AUDITOR = 'ROLE_AUDITOR',
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
		return this.roles.some(el => el === UserRole.ROLE_MANAGER);
	}

	get IsAuditor() {
		return this.roles.some(el => el === UserRole.ROLE_AUDITOR);
	}

	get DisplayName() {
		return this.IsManager ? this.name.FullName : this.company.name;
	}

	get Bans() {
		return this.customer.bans;
	}

	get USDBalance(): Money | undefined {
		return this.customer.balances.find(el => el.money.currency === Currency.USD)?.money;
	}


	// get DefaultBalance() {
	// 	return this.customer.balances.find(el => el.money.currency === 'USD')?.money || this.customer.balances[0].money;
	// }
}

export class UserBan {
	reason: BAN_REASON
}

export class Customer {
	externalId: string;

	@Type(() => Curator)
	curator: Curator | null;

	@Type(() => UserBan)
	bans: UserBan[];
	balances: Balance[];
}

export class Curator {
	name: string;
	photoUrl: string | null;
	phones: string[];
	emails: string[];

	// get IsPhoto() {
	// 	return this.photoUrl?.includes('.')
	// }
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
