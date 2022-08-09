import {Preference} from "@shared/models/view/preference";

export const pageSizeList = [25, 50, 100] as const;

export type PageSizes = typeof pageSizeList [number];

export type PaginationParams = {
	pageSize: Preference<PageSizes>,
	pageNum: number
}

export type HttpPaginationParams = {
	pageSize: PageSizes,
	pageNum: number
}

export type IHasTotalItems = {
	totalItems: number;
}

export type FetchPaginationResult<T = any> = {
	items: T[]
} & IHasTotalItems;
