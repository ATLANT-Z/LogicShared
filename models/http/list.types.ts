export const pageSizeList = [50, 40, 35, 25, 15, 10] as const;

export type PageSizes = typeof pageSizeList [number];

export type PaginationParams = {
	pageSize: PageSizes,
	pageNum: number
}

export type IHasTotalItems = {
	totalItems: number;
}

export type FetchPaginationResult<T = any> = {
	items: T[]
} & IHasTotalItems;
