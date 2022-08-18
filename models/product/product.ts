import {ILocaleableValue, Jsonable, VueRef} from "@/_shared/models/tools/tools";
import {LocaleableValue} from "@/_shared/services/translate.service";
import {ProductCategory} from "@/_shared/models/category";
import {Attachment, IHasUrl, Img} from "@/_shared/models/product/attachment";
import {Expose, Type} from "class-transformer";
import {Manufacturer} from "@shared/models/product/filter/criteria";
import {routeHelper} from "@shared/helpers/route.helper";
import {
	ProductSeenHttpResource,
	ProductHttpResource, ProductCartHttpResource,
} from "@shared/models/http/product/product";
import {
	IHasQuantity,
	OrderBag,
	OrderCartType,
	Price,
	PriceType,
	ProductStatus,
	RichText
} from "@shared/models/product/types";
import {isArray} from "lodash";
import {ProductSpecification} from "@shared/models/product/specification";
import {reactive} from "vue";
import {ProductViewService} from "@services/product/product.service";

export class Product extends Jsonable<Product>() implements ProductHttpResource {
	id: string;
	code: string;
	barcode?: string;

	@ILocaleableValue() slug: LocaleableValue;
	@ILocaleableValue() name: LocaleableValue;
	@ILocaleableValue() description: LocaleableValue<RichText>;

	status: ProductStatus;

	@Type(() => Manufacturer)
	manufacturer: Manufacturer;

	@Type(() => ProductSpecification)
	specifications: ProductSpecification[];

	@Type(() => ProductCategory)
	categories: ProductCategory[];

	@Type(() => Attachment)
	attachments: Attachment[];

	@Type(() => Img)
	images: Img[]


	@Type(() => OrderBag)
	orderBags: OrderBag[];

	@Type(() => Price)
	prices: Price[];

	compared: boolean;
	wished: boolean;
	isActive: boolean;

	/// Добавляем в корзину только если есть цена.
	get Price() {
		return this.prices.find(el => el.type === PriceType.Personal)?.money;
	}

	get RRP() {
		return this.prices.find(el => el.type === PriceType.RRP)?.money;
	}

	get VueLink() {
		return {
			name: routeHelper.names['product'],
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
}

export class CartProduct extends Jsonable<CartProduct>() implements ProductCartHttpResource {
	@VueRef()
	@Type(() => Product)
	product: Product;
	@Type(() => OrderBag)
	orderBag: OrderBag;
	quantity: number;
	isActive: boolean;

	get TotalSum() {
		return ProductViewService.getTotalSum(this);
	}
}

export class CartableProduct extends Jsonable<CartProduct>() implements IProductQuantity {
	product: Product;
	quantity: number;
}

export interface IProductQuantity extends IHasQuantity {
	product: Product;
}

type PlainProduct = ProductHttpResource | ProductHttpResource[];

export class ProductFactory {
	private static initOne(raw: ProductHttpResource) {
		return Product.fromJson(raw);
	}

	private static initMany(rawList: ProductHttpResource[]) {
		return rawList.map(el => ProductFactory.initOne(el));
	}

	private static isArray(p: PlainProduct): p is ProductHttpResource[] {
		return isArray(p);
	}

	private static isObj(p: PlainProduct): p is ProductHttpResource {
		return !isArray(p);
	}

	static build<Plain extends PlainProduct>(productResource: Plain): Plain extends Array<any> ? Product[] : Product
	static build(productResource): any {
		if (ProductFactory.isArray(productResource)) {
			return ProductFactory.initMany(productResource);
		}

		if (ProductFactory.isObj(productResource)) {
			return ProductFactory.initOne(productResource);
		}
	}
}

type PlainCartableProduct = IProductQuantity | IProductQuantity[];

export class CartableProductFactory {
	private static initOne(raw: IProductQuantity): CartableProduct {
		return CartableProduct.fromJson(raw);
	}

	private static initMany(rawList: IProductQuantity[]) {
		return rawList.map(el => CartableProductFactory.initOne(el));
	}

	private static isArray(p: PlainCartableProduct): p is IProductQuantity[] {
		return isArray(p);
	}

	private static isObj(p: PlainCartableProduct): p is IProductQuantity {
		return !isArray(p);
	}

	static build<Plain extends PlainCartableProduct>(productResource: Plain): Plain extends Array<any> ? CartableProduct[] : CartableProduct
	static build(productResource): any {
		if (CartableProductFactory.isArray(productResource)) {
			return CartableProductFactory.initMany(productResource);
		}

		if (CartableProductFactory.isObj(productResource)) {
			return CartableProductFactory.initOne(productResource);
		}
	}
}

type PlainSeenProduct = ProductSeenHttpResource | ProductSeenHttpResource[];

export class SeenProductFactory {

	private static initOne(raw: ProductSeenHttpResource) {
		return Product.fromJson(raw.product);
	}

	private static initMany(rawList: ProductSeenHttpResource[]) {
		return rawList.map(el => SeenProductFactory.initOne(el));
	}

	private static isArray(p: PlainSeenProduct): p is ProductSeenHttpResource[] {
		return isArray(p);
	}

	private static isObj(p: PlainSeenProduct): p is ProductSeenHttpResource {
		return !isArray(p);
	}


	static build<Plain extends PlainSeenProduct>(productResource: Plain): Plain extends Array<any> ? Product[] : Product
	static build<Plain extends PlainSeenProduct>(productResource: Plain): any {
		if (SeenProductFactory.isArray(productResource)) {
			return SeenProductFactory.initMany(productResource);
		}

		if (SeenProductFactory.isObj(productResource)) {
			return SeenProductFactory.initOne(productResource);
		}
	}
}

type PlainCartProduct = ProductCartHttpResource | ProductCartHttpResource[];

export class CartProductFactory {
	private static initOne(raw: ProductCartHttpResource) {
		return CartProduct.fromJson(raw);
	}

	private static initMany(rawList: ProductCartHttpResource[]) {
		return rawList.map(el => CartProductFactory.initOne(el));
	}

	private static isArray(p: PlainCartProduct): p is ProductCartHttpResource[] {
		return isArray(p);
	}

	private static isObj(p: PlainCartProduct): p is ProductCartHttpResource {
		return !isArray(p);
	}

	static build<Plain extends PlainCartProduct>(productResource: Plain): Plain extends Array<any> ? CartProduct[] : CartProduct
	static build<Plain extends PlainCartProduct>(productResource: Plain): any {
		if (CartProductFactory.isArray(productResource)) {
			return CartProductFactory.initMany(productResource);
		}

		if (CartProductFactory.isObj(productResource)) {
			return CartProductFactory.initOne(productResource);
		}
	}
}


