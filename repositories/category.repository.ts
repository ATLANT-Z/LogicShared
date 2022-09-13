import {Category} from "@shared/models/category";
import {reactive} from "vue";
import {errorService} from "@shared/services/error.service";
import API from "@/http/API";
import {PromiseWrapper} from "@shared/models/tools/promise";

class CategoryRepository {
	private promiseWrapper: PromiseWrapper<Category[]> | undefined;

	async getList(): Promise<Category[]> {
		if (!this.promiseWrapper || this.promiseWrapper.IsRejected) {
			this.promiseWrapper = new PromiseWrapper<Category[]>(API.Catalog.Category.List.getAll());
		}

		return this.promiseWrapper.value;
	}

	async findBySlug(slug: string): Promise<Category | undefined> {
		return this.getList()
			.then(list => this.syncFindBySlug(slug, list))
	}

	private syncFindBySlug(slug: string, list: Category[]): Category | undefined {
		let category = list.find(el => el.slug.contains(slug));
		if (category) return category;

		for (let i = 0; i < list.length; i++) {
			category = this.syncFindBySlug(slug, list[i].children)
			if (category) return category;
		}

		return undefined;
	}
}

export const categoryRepository = reactive(new CategoryRepository());
