import {ILocaleableValue, Jsonable} from "@/_shared/models/tools/tools";
import {LocaleableValue} from "@/_shared/services/translate.service";
import {Category} from "@/_shared/models/category";
import {Attachment, IHasUrl, Img, MyFile} from "@/_shared/models/product/attachment";
import {Expose, Transform, Type} from "class-transformer";
import {Manufacturer, Specification} from "@shared/models/product/criteria";
import {routeHelper} from "@shared/helpers/route.helper";
import {ICanActive} from "@shared/models/view/product/types";
import {reactive} from "vue";

type RichText = string;

export enum PRODUCT_STATUS {
	inStock = 'inStock',
	outOfStock = 'outOfStock',
	quickProduction = 'quickProduction',
	preOrder = 'preOrder',
	availableForOrder = 'availableForOrder'
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
	barcode: string;

	@ILocaleableValue() slug: LocaleableValue;
	@ILocaleableValue() name: LocaleableValue;
	@ILocaleableValue() description: LocaleableValue<RichText>;

	status: PRODUCT_STATUS;

	@Type(() => Price)
	private prices: Price[];
	manufacturer: Manufacturer;

	@Type(() => Specification)
	specifications: Specification[];

	@Type(() => Category)
	categories: Pick<Category, 'id' | 'name' | 'slug'>[];

	@Type(() => Attachment)
	attachments: Attachment[];

	@Type(() => Img)
	images: Img[]

	compared: boolean = false;
	wished: boolean = false;

	@Expose()
	@Transform(({value}) => value ? value : 1)
	count: number;

	/// Добавляем в корзину только если есть цена.
	get Price() {
		return this.prices.find(el => el.type === PRICE_TYPE.PERSONAL)?.money;
	}

	get RRP() {
		return this.prices.find(el => el.type === PRICE_TYPE.RRP)?.money;
	}

	get VueLink() {
		return {
			name: routeHelper.names.product,
			params: {
				[routeHelper.params.slug]: this.slug
			}
		};
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

	async addToCart() {
		return console.log('добавили в корзину');
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

export class CartProduct implements ICanActive {
	product: Product;

	IsActive: boolean = true;

	constructor(product: Product) {
		this.product = reactive(product) as Product;
	}
}

