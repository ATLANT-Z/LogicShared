import {Currency} from "@shared/models/money/currency";
import {Type} from "class-transformer";

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

export enum CartOrderType {
	Order = 'order',
	PreOrder = 'preOrder'
}

export class Money {
	amount: number;
	currency: string;
}

export class Price {
	type: PriceType;

	@Type(() => Type)
	money: Money;
}

export class OrderCart {
	type: CartOrderType;
	currency: Currency;
}

export interface IHasQuantity {
	quantity: number;
}
