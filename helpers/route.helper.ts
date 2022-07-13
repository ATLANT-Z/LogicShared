import {reactive} from "vue";
import {ROUTE_NAMES} from "@/router/routeNames";
import {ROUTE_QUERY_PARAMS} from "@/router/routeQueryParams";
import {ROUTE_PARAMS} from "@/router/routeParams";

type RouteName = keyof typeof ROUTE_NAMES;
type RouteNames = Record<RouteName, string>

type RouteQParam = keyof typeof ROUTE_QUERY_PARAMS;
type RouteQParams = Record<RouteQParam, string>

type RouteParam = keyof typeof ROUTE_PARAMS;
type RouteParams = Record<RouteParam, string>

export class RouteHelper {
	private routeNames = Object.keys(ROUTE_NAMES).filter(el => {
		return isNaN(+el)
	});
	private routeQParams = Object.keys(ROUTE_QUERY_PARAMS).filter(el => {
		return isNaN(+el)
	});
	private routeParams = Object.keys(ROUTE_PARAMS).filter(el => {
		return isNaN(+el)
	});

	names: RouteNames = this.routeNames.reduce((prev, curr) => {
		prev[curr] = curr;
		return prev
	}, {}) as RouteNames;

	params: RouteParams = this.routeParams.reduce((prev, curr) => {
		prev[curr] = curr;
		return prev
	}, {}) as RouteParams;

	queryParams: RouteQParams  = this.routeQParams.reduce((prev, curr) => {
		prev[curr] = curr;
		return prev
	}, {}) as RouteQParams;
}

export const routeHelper = reactive(new RouteHelper());
