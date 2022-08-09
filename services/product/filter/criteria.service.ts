import {ProductQuery, ProductRouteQuery} from "@shared/models/product/query";
import {Criteria, PartCriteria} from "@shared/models/product/filter/criteria";

export class CriteriaService {
	static toProductQueryParams(criteria: Criteria): ProductRouteQuery {
		const query = CriteriaService.toProductQuery(criteria);
		return ProductQuery.toJson(query, {groups: ['route']}) as ProductRouteQuery;
	}

	private static toProductQuery(criteria: Criteria): ProductQuery {
		const params: ProductQuery = {};

		criteria.priceRange.currMin && (params.minPrice = criteria.priceRange.currMin);
		criteria.priceRange.currMax && (params.maxPrice = criteria.priceRange.currMax);

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


	static recoverState(criteria: Criteria, productQuery: ProductQuery): Criteria {
		const partCriteria = this.getPartCriteriaFromQuery(productQuery);

		if (productQuery.minPrice && productQuery.minPrice <= criteria.priceRange.min) {
			criteria.priceRange.min = productQuery.minPrice;
			criteria.priceRange.currMin = productQuery.minPrice;
		} else {
			criteria.priceRange.currMin = productQuery.minPrice;
		}

		if (productQuery.maxPrice && productQuery.maxPrice >= criteria.priceRange.max) {
			criteria.priceRange.max = productQuery.maxPrice;
			criteria.priceRange.currMax = productQuery.maxPrice;
		} else {
			criteria.priceRange.currMax = productQuery.maxPrice;
		}

		partCriteria.manufacturerSlugs.forEach(slug => {
			const manufacturer = criteria.manufacturers.find(el => el.slug === slug);
			if (manufacturer) manufacturer.IsActive = true;
		})

		partCriteria.specifications.forEach(partSpec => {
			const spec = criteria.specifications.find(el => el.id === partSpec.specId);
			if (spec) {
				partSpec.optionIds.forEach(optId => {
					const opt = spec.options.find(el => el.id === optId);
					if (opt) opt.IsActive = true;
				});
			}
		})

		return criteria
	}

	private static getPartCriteriaFromQuery(productQuery: ProductQuery): PartCriteria {
		const criteria: PartCriteria = new PartCriteria();

		productQuery.maxPrice && (criteria.priceRange.max = +productQuery.maxPrice);
		productQuery.minPrice && (criteria.priceRange.min = +productQuery.minPrice);

		productQuery.manufacturers && (criteria.manufacturerSlugs = productQuery.manufacturers?.split(','));

		if (productQuery.specifications) {
			criteria.specifications = productQuery.specifications.split(';')
				.map(specString => {
					const [specId, optionIdsStr] = specString.split(':');
					const optionIds = optionIdsStr.split(',').map(el => +el);
					return {
						specId: +specId,
						optionIds
					};
				})
		}

		return criteria;
	}


	static fromRouteQueryToProductQuery(query: ProductRouteQuery): ProductQuery {
		return ProductQuery.fromJson(query, {groups: ['route']});
	}
}
