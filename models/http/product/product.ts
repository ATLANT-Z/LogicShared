import {LocaleableValue} from "@shared/services/translate.service";
import {Manufacturer} from "@shared/models/product/filter/criteria";
import {Category} from "@shared/models/category";
import {Attachment, Img} from "@shared/models/product/attachment";
import {IHasQuantity, OrderBag, Price, ProductStatus, RichText} from "@shared/models/product/types";
import {ProductSpecification} from "@shared/models/product/specification";

export interface ProductHttpResource {
	id: string;
	code: string;
	barcode?: string;

	slug: LocaleableValue;
	name: LocaleableValue;
	description: LocaleableValue<RichText>;

	status: ProductStatus;

	manufacturer: Manufacturer;
	specifications: ProductSpecification[];

	categories: Pick<Category, 'id' | 'name' | 'slug'>[];

	attachments: Attachment[];
	images: Img[];

	orderBags: OrderBag[];

	prices: Price[];
}

export type ProductSeenHttpResource = {
	createdAt: number;
	product: ProductHttpResource;
}

export interface ProductCartHttpResource extends IHasQuantity {
	product: ProductHttpResource;
	orderBag: OrderBag;
	isActive: boolean;
}

