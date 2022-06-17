import {Type} from "class-transformer";
import {ILocaleableValue, Jsonable} from "@/_shared/models/tools/tools";
import {LocaleableValue} from "@/_shared/services/translate.service";

export class Category extends Jsonable<Category>() {
	id: string;

	@ILocaleableValue() slug: LocaleableValue;
	@ILocaleableValue() name: LocaleableValue;

	productsCount: number;

	@Type(() => Category)
	children: Category[];
}
