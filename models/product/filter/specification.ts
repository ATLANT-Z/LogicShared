import {ILocaleableValue} from "@shared/models/tools/tools";
import {Type} from "class-transformer";
import {Option} from "@shared/models/product/option";
import {LocaleableValue} from "@shared/models/translate/localeableValue";

export class FilterSpecification {
	id: number;

	@ILocaleableValue() name: LocaleableValue;

	@Type(() => Option) options: Option[];
}
