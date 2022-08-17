import {Currency} from "@shared/models/money/currency";
import {Type} from "class-transformer";
import {Money} from "@shared/models/money/money";
import {Jsonable} from "@shared/models/tools/tools";

export type RichText = string;

export enum ProductStatus {
	inStock = 'inStock',
	outOfStock = 'outOfStock',
	quickProduction = 'quickProduction',
	preOrder = 'preOrder',
}

export enum PriceType {
	Personal = 'personal',
	RRP = 'recommendedRetail'
}

export enum OrderCartType {
	Order = 'order',
	PreOrder = 'preOrder'
}

export class Price {
	type: PriceType;
	money: Money;
}

export type OrderBagPlain = `${OrderCartType}${Currency}`

export class OrderBag extends Jsonable<OrderBag>() {
	type: OrderCartType;
	currency: Currency;

	get Plain(): OrderBagPlain {
		return `${this.type}${this.currency}` as OrderBagPlain;
	}
}

export interface IHasQuantity {
	quantity: number;
}
