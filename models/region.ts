import {ILocaleableValue, Jsonable} from "@shared/models/tools/tools";
import {LocaleableValue} from "@shared/models/translate/localeableValue";

export class Region extends Jsonable<Region>() {
	id: string;
	@ILocaleableValue() name: LocaleableValue;
}
