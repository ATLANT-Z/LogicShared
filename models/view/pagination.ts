import {
	HttpPaginationParams,
	IHasTotalItems,
	pageSizeList,
	PageSizes,
	PaginationParams
} from "@shared/models/http/list.types";
import {Preference} from "@shared/models/view/preference";

export type ViewPaginationParams = IHasTotalItems & PaginationParams;

export class PaginationHelper<T = any> {
	pageSizeList = pageSizeList;
	static defaultViewPaginationParams: ViewPaginationParams = {
		pageSize: new Preference<PageSizes>('pageSize', 25),
		pageNum: 1,
		totalItems: 1,
	}

	viewParams: ViewPaginationParams = {...PaginationHelper.defaultViewPaginationParams};

	getHttpParams(): HttpPaginationParams {
		return {
			pageNum: this.viewParams.pageNum,
			pageSize: this.viewParams.pageSize.Value
		}
	}
}
