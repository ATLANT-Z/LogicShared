import {ILocaleableValue, Jsonable} from "@/_shared/models/tools/tools";
import {LocaleableValue} from "@/_shared/services/translate.service";
import {Category} from "@/_shared/models/category";
import {Attachment, IHasUrl, Img, MyFile} from "@/_shared/models/product/attachment";
import {Type} from "class-transformer";
import {Manufacturer, Specification} from "@shared/models/product/criteria";

type RichText = string;

enum PRODUCT_STATUS {
	outOfStock = 'outOfStock'
}

enum PRICE_TYPE {
	PERSONAL = 'personal',
	RRP = 'recommendedRetail'
}

export class Money {
	amount: number;
	currency: string;
}

export class Price {
	type: PRICE_TYPE;

	@Type(() => Type)
	money: Money;
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

	@Type(() => Img)
	images: Img[]

	compared: boolean = false;
	wished: boolean = false;

	/// Добавляем в корзину только если есть цена.
	get Price() {
		return this.prices.find(el => el.type === PRICE_TYPE.PERSONAL)?.money;
	}

	get RRP() {
		return this.prices.find(el => el.type === PRICE_TYPE.RRP)?.money;
	}

	get MainImg(): Img | undefined {
		if (this.images.length) return this.images[0]
		else return undefined;
	}

	get MainSmallImg(): IHasUrl | undefined {
		if (this.images.length) {
			if (this.images[0].thumbnails.length)
				return this.images[0].thumbnails[0];
			else
				return this.images[0];
		} else return undefined;
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

