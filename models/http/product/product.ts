import {LocaleableValue} from "@shared/services/translate.service";
import {Manufacturer, SpecificationProduct} from "@shared/models/product/criteria";
import {Category} from "@shared/models/category";
import {Attachment, Img} from "@shared/models/product/attachment";
import {IHasQuantity, OrderCart, Price, ProductStatus, RichText} from "@shared/models/product/types";

export interface ProductHttpResource {
	id: string;
	code: string;
	barcode: string;

	slug: LocaleableValue;
	name: LocaleableValue;
	description: LocaleableValue<RichText>;

	status: ProductStatus;

	manufacturer: Manufacturer;
	specifications: SpecificationProduct[];

	categories: Pick<Category, 'id' | 'name' | 'slug'>[];

	attachments: Attachment[];
	images: Img[];

	orderCart: OrderCart;
	prices: Price[];
}

export type ProductSeenHttpResource = {
	createdAt: number;
	product: ProductHttpResource;
}

export interface ProductCartHttpResource extends IHasQuantity {
	product: ProductHttpResource;
	isActive: boolean;
}

