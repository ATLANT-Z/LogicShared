import {ILocaleableValue, Jsonable} from "@/_shared/models/tools/tools";
import {LocaleableValue} from "@/_shared/services/translate.service";
import {Category} from "@/_shared/models/category";
import {Attachment} from "@/_shared/models/product/attachment";
import {Type} from "class-transformer";

type RichText = string;

enum PRODUCT_STATUS {
	outOfStock = 'outOfStock'
}

export interface Price {
	amount: number;
	currency: string;
}

export interface Manufacturer {
	slug: string;
	name: string;
}

export class Specification {
	id: number;
	@ILocaleableValue() name: LocaleableValue;

	/// TODO value => option && :=> Option
	@ILocaleableValue() value: LocaleableValue;
}

export class Product extends Jsonable<Product>() {
	id: string;
	code: string;

	@ILocaleableValue() slug: LocaleableValue;
	@ILocaleableValue() name: LocaleableValue;
	@ILocaleableValue() description: LocaleableValue<RichText>;

	status: PRODUCT_STATUS;
	price: Price;
	manufacturer: Manufacturer;

	@Type(() => Specification)
	specifications: Specification[];

	categories: Pick<Category, 'id' | 'name' | 'slug'>[];

	@Type(() => Attachment)
	attachments: Attachment[];

	compared: boolean = false;
	wished: boolean = false;


	get MainImg() {
		return this.attachments.find(el => {
			// debugger;
			return el.group.name === 'Изображение'
		})?.files[0];
	}


	addToCart() {
		console.log('добавили в корзину');
	}

	addCompare() {
		console.log('добавили в сравнение');
	}

	removeCompare() {
		console.log('удалили из сравнения');
	}

	addFavorite() {

	}

	removeFavorite() {

	}
}
