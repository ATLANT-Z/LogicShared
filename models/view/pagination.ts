type PageSizes = PaginationHelper['pageSizeList'][number];
export type PaginationParams = {
	pageSize: PageSizes,
	pageNum: number
}

type IHasTotalItems = {
	totalItems: number;
}

export type ViewPaginationParams = IHasTotalItems & PaginationParams;

export type FetchPaginationResult<T = any> = {
	items: T[]
} & IHasTotalItems;

export class PaginationHelper<T = any> {
	readonly pageSizeList = [50, 40, 35, 25, 15, 10] as const;

	static defaultViewPaginationParams: ViewPaginationParams = {
		pageSize: 15,
		pageNum: 1,
		totalItems: 1,
	}

	viewParams: ViewPaginationParams = {...PaginationHelper.defaultViewPaginationParams};

	getFetchParams(): PaginationParams {
		return {
			pageNum: this.viewParams.pageNum,
			pageSize: this.viewParams.pageSize
		}
	}
}
