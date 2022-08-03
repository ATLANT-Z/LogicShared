import {LocaleableValue} from "@shared/services/translate.service";
import {ILocaleableValue, Jsonable} from "@shared/models/tools/tools";
import {Type} from "class-transformer";
import {IFilterItem} from "@shared/models/view/product/types";
import {ProductQuery} from "@shared/models/product/filter";
import {RouteQParams} from "@shared/helpers/route.helper";

type ProductRouteQuery = Partial<Pick<RouteQParams,
	'q' |
	'ref' |
	'maxPrice' |
	'minPrice' |
	'manufacturers' |
	'specifications'>>

export class CriteriaTransformer {
	private static toProductQuery(criteria: Criteria): ProductQuery {
		const params: ProductQuery = {};

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

		return params;
	}

	static toProductQueryParams(criteria: Criteria): ProductRouteQuery {
		const query = CriteriaTransformer.toProductQuery(criteria);

		const queryParams: ProductRouteQuery = {
			q: query.searchQuery,
			ref: query.referenceId,
			maxPrice: query.maxPrice?.toString(),
			minPrice: query.minPrice?.toString(),
			specifications: query.specifications,
			manufacturers: query.manufacturers,
		}

		Object.keys(queryParams).forEach(key => {
			if (!queryParams[key]) delete queryParams[key]
		});

		return queryParams;
	}


}

export class Criteria extends Jsonable<Criteria>() {
	@Type(() => PriceRange)
	priceRange: PriceRange;

	@Type(() => Manufacturer)
	manufacturers: Manufacturer[];

	@Type(() => SpecificationFilter)
	specifications: SpecificationFilter[];
}

export class PriceRange {
	min: number;
	max: number;
}

export class Manufacturer extends IFilterItem {
	name: string;
	slug: string;
}

export class SpecificationFilter {
	id: number;

	@ILocaleableValue() name: LocaleableValue;

	@Type(() => Option) options: Option[];
}

export class SpecificationProduct {
	id: number;

	@ILocaleableValue() name: LocaleableValue;

	@Type(() => Option) option: Option;
}

export class Option extends IFilterItem {
	id: number;
	@ILocaleableValue() value: LocaleableValue<string | number>;
}

