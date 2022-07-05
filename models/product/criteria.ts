import {LocaleableValue} from "@shared/services/translate.service";
import {ILocaleableValue, Jsonable} from "@shared/models/tools/tools";
import {Type} from "class-transformer";
import {IFilterItem} from "@shared/models/view/product/types";
import {FilterParams} from "@shared/models/http/product/filter";


class CriteriaTransformer {
	static transform(criteria: Criteria): FilterParams {
		const params: FilterParams = {};

		params.maxPrice = criteria.priceRange.max;
		params.minPrice = criteria.priceRange.min;

		params.manufacturers = criteria.manufacturers
			.filter(el => el.IsActive)
			.map(el => el.slug)
			.join(',');

		params.specifications = criteria.specifications
			.filter(spec => spec.options.some(el => el.IsActive))
			.map(spec => {
				const opts = spec.options
					.filter(opt => opt.IsActive)
					.map(opt => opt.id)
					.join(',');
				return `${spec.id}:${opts}`;
			}).join(';');

		// debugger
		return params;
	}
}

export class Criteria extends Jsonable<Criteria>() {
	@Type(() => PriceRange)
	priceRange: PriceRange;

	@Type(() => Manufacturer)
	manufacturers: Manufacturer[];

	@Type(() => Specification)
	specifications: Specification[];

	getFilterParams(): FilterParams {
		return CriteriaTransformer.transform(this);
	}
}

export class PriceRange {
	min: number;
	max: number;
}

export class Manufacturer extends IFilterItem {
	name: string;
	slug: string;
}

export class Specification {
	id: number;

	@ILocaleableValue() name: LocaleableValue;

	@Type(() => Option) options: Option[];
}

export class Option extends IFilterItem {
	id: number;
	@ILocaleableValue() value: LocaleableValue;
}

