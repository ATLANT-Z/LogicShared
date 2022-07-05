import {Expose} from "class-transformer";
import {ILocaleableValue, Jsonable} from "@/_shared/models/tools/tools";
import {DictLanguage, LocaleableValue} from "@/_shared/services/translate.service";


export class Region extends Jsonable<Region>() {
	//TODO решили вернуть +=> id:string
	iso: string;
	@ILocaleableValue() name: LocaleableValue;
}

type UserNames = {
	firstName: string,
	middleName: string,
	lastName: string,
}

export class User extends Jsonable<User>() {
	@Expose() id: string;
	@Expose() email: string;
	@Expose() phone: string;
	@Expose() name: UserNames;
	@Expose() locale: DictLanguage;
}

