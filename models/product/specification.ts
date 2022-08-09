import {ILocaleableValue} from "@shared/models/tools/tools";
import {LocaleableValue} from "@shared/services/translate.service";
import {Type} from "class-transformer";
import {Option} from "@shared/models/product/option";

export class ProductSpecification {
	id: number;

	@ILocaleableValue() name: LocaleableValue;

	@Type(() => Option) option: Option;
}
