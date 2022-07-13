import {Type} from "class-transformer";
import {ILocaleableValue, Jsonable} from "@/_shared/models/tools/tools";
import {LocaleableValue} from "@/_shared/services/translate.service";
import {routeHelper} from "@shared/helpers/route.helper";

export class Category extends Jsonable<Category>() {
	id: string;

	@ILocaleableValue() slug: LocaleableValue;
	@ILocaleableValue() name: LocaleableValue;

	productsCount: number;

	@Type(() => Category)
	children: Category[];

	get VueLink() {
		return {
			name: routeHelper.names['product-catalog'],
			params: {
				[routeHelper.params.slug]: this.slug
			}
		}
	}
}
