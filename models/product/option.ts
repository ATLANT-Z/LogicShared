import {IFilterItem} from "@shared/models/view/product/types";
import {ILocaleableValue} from "@shared/models/tools/tools";
import {LocaleableValue} from "@shared/models/translate/localeableValue";

export class Option extends IFilterItem {
	id: number;
	@ILocaleableValue() value: LocaleableValue<string | number>;
}
