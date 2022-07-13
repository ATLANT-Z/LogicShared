export const pageSizeList = [100, 50, 25] as const;

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
