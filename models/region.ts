import {ILocaleableValue, Jsonable} from "@shared/models/tools/tools";
import {LocaleableValue} from "@shared/services/translate.service";

export class Region extends Jsonable<Region>() {
	id: string;
	@ILocaleableValue() name: LocaleableValue;
}
