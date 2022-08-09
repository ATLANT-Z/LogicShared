import {IFilterItem} from "@shared/models/view/product/types";
import {ILocaleableValue} from "@shared/models/tools/tools";
import {LocaleableValue} from "@shared/services/translate.service";

export class Option extends IFilterItem {
	id: number;
	@ILocaleableValue() value: LocaleableValue<string | number>;
}
