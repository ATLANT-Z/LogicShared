import {reactive} from "vue";
import {ROUTE_NAMES} from "@/router/enum/names.enum";
import {ROUTE_QUERY_PARAMS} from "@/router/enum/queryParams.enum";
import {ROUTE_PARAMS} from "@/router/enum/params.enum";
import {EnumHelper} from "@shared/helpers/enum.helper";

type RouteName = keyof typeof ROUTE_NAMES;
type RouteNames = Record<RouteName, string>

type RouteQParam = keyof typeof ROUTE_QUERY_PARAMS;
type RouteQParams = Record<RouteQParam, string>

type RouteParam = keyof typeof ROUTE_PARAMS;
type RouteParams = Record<RouteParam, string>

export class RouteHelper {
	names: RouteNames = EnumHelper.getEnumMap(ROUTE_NAMES) as RouteNames;

	params: RouteParams = EnumHelper.getEnumMap(ROUTE_PARAMS) as RouteParams;

	queryParams: RouteQParams  = EnumHelper.getEnumMap(ROUTE_QUERY_PARAMS) as RouteQParams;
}

export const routeHelper = reactive(new RouteHelper());
