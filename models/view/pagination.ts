import {IHasTotalItems, pageSizeList, PaginationParams} from "@shared/models/http/list.types";

export type ViewPaginationParams = IHasTotalItems & PaginationParams;

export class PaginationHelper<T = any> {
	pageSizeList = pageSizeList;
	static defaultViewPaginationParams: ViewPaginationParams = {
		pageSize: 25,
		pageNum: 1,
		totalItems: 1,
	}

	viewParams: ViewPaginationParams = {...PaginationHelper.defaultViewPaginationParams};

	getHttpParams(): PaginationParams {
		return {
			pageNum: this.viewParams.pageNum,
			pageSize: this.viewParams.pageSize
		}
	}
}
