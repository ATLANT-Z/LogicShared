import {Criteria} from "@shared/models/product/filter/criteria";
import {ProductQuery} from "@shared/models/product/query";
import {categoryRepository} from "@shared/repositories/category.repository";

export class FilterViewService {
	constructor(public q: ProductQuery) {
	}

	private categorySlugsWithHiddenSpec: string[] = [
		'arhiv',
		'ucenka'
	]

	async getIsShowSpec(): Promise<boolean> {
		if (!this.q.categorySlug) return true;
		const category = await categoryRepository.findBySlug(this.q.categorySlug);
		if (!category) return true;
		return !this.categorySlugsWithHiddenSpec.some(el => category.slug.contains(el));
	}
}
