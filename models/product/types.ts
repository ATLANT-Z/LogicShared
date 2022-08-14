import {Currency} from "@shared/models/money/currency";
import {Type} from "class-transformer";
import {Money} from "@shared/models/money/money";

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

export class OrderBag {
	type: OrderCartType;
	currency: Currency;
}

export interface IHasQuantity {
	quantity: number;
}
