import {Jsonable} from "@shared/models/tools/tools";
import {Exclude, Expose, Transform} from "class-transformer";
import {RouteQParams} from "@shared/helpers/route.helper";

export type ProductRouteQuery = Partial<Pick<RouteQParams,
	'q' |
	'ref' |
	'maxPrice' |
	'minPrice' |
	'manufacturers' |
	'specifications'>>

export class ProductQuery extends Jsonable<ProductQuery>() {
	@Exclude({toPlainOnly: true})
	categorySlug?: string;
	@Exclude({toPlainOnly: true})
	categoryId?: string;

	@Expose({name: 'q' as keyof ProductRouteQuery, groups: ['route']})
	searchQuery?: string;

	@Expose({name: 'minPrice' as keyof ProductRouteQuery, groups: ['route']})
	@Transform(({value}) => value && +value, {toClassOnly: true})
	@Transform(({value}) => value && value.toString(), {toPlainOnly: true, groups: ['route']})
	minPrice?: number;

	@Expose({name: 'maxPrice' as keyof ProductRouteQuery, groups: ['route']})
	@Transform(({value}) => value && +value, {toClassOnly: true})
	@Transform(({value}) => value && value.toString(), {toPlainOnly: true, groups: ['route']})
	maxPrice?: number;

	@Expose({name: 'manufacturers' as keyof ProductRouteQuery, groups: ['route']})
	manufacturers?: string;
	@Expose({name: 'specifications' as keyof ProductRouteQuery, groups: ['route']})
	specifications?: string;


	@Expose({name: 'ref' as keyof ProductRouteQuery, groups: ['route']})
	referenceId?: string;
}
