import {ILocaleableValue, Jsonable} from "@/_shared/models/tools/tools";
import {LocaleableValue} from "@/_shared/services/translate.service";
import {Category} from "@/_shared/models/category";
import {Attachment, ImgFile} from "@/_shared/models/product/attachment";
import {Type} from "class-transformer";

type RichText = string;

enum PRODUCT_STATUS {
	outOfStock = 'outOfStock'
}


/// TODO key rrp => recommendedRetail
enum PRICE_TYPE {
	PERSONAL = 'personal',
	RRP = 'rrp'
}

export class Money {
	/// TODO тут скорей всего надо будет пересчитывать валюту, как перевод языка. LocaleableValue
	amount: number;
	currency: string;
}

export class Price {
	type: PRICE_TYPE;

	@Type(() => Type)
	money: Money;
}

export interface Manufacturer {
	slug: string;
	name: string;
}

export class Option {
	id: number;
	@ILocaleableValue() value: LocaleableValue;
}

export class Specification {
	id: number;
	@ILocaleableValue() name: LocaleableValue;

	@Type(() => Option)
	option: Option;
}

export class Product extends Jsonable<Product>() {
	id: string;
	code: string;

	@ILocaleableValue() slug: LocaleableValue;
	@ILocaleableValue() name: LocaleableValue;
	@ILocaleableValue() description: LocaleableValue<RichText>;

	status: PRODUCT_STATUS;

	@Type(() => Price)
	private prices: Price[];
	manufacturer: Manufacturer;

	@Type(() => Specification)
	specifications: Specification[];

	categories: Pick<Category, 'id' | 'name' | 'slug'>[];

	@Type(() => Attachment)
	attachments: Attachment[];

	compared: boolean = false;
	wished: boolean = false;

	/// TODO добавляем в корзину только если есть цена.
	get Price() {
		return this.prices.find(el => el.type === PRICE_TYPE.PERSONAL)?.money;
	}

	get RRP() {
		return this.prices.find(el => el.type === PRICE_TYPE.RRP)?.money;
	}


	get MainImg(): ImgFile | undefined {
		const group = this.attachments.find(el => {
			return el.group === 'images'
		});

		if (group && group.files.length) return group.files[0]
		else return undefined;
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

