import {Criteria} from "@shared/models/product/filter/criteria";
import {ProductQuery} from "@shared/models/product/query";

export class FilterViewService {
	constructor(public q: ProductQuery) {
	}

	private categorySlugsWithHiddenSpec: string[] = [
		'arhiv',
		'ucenka'
	]

	get IsShowSpec(): boolean {
		if (!this.q.categorySlug) return true;
		return !this.categorySlugsWithHiddenSpec.includes(this.q.categorySlug);
	}
}
