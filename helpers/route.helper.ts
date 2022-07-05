import {reactive} from "vue";
import {ROUTE_NAMES} from "@/router/routeNames";

type RouteName = keyof typeof ROUTE_NAMES;
type RouteNames = Record<RouteName, string>

export class RouteHelper {
	private routesNameList = Object.keys(ROUTE_NAMES).filter(el => {
		return isNaN(+el)
	});

	names: RouteNames = this.routesNameList.reduce((prev, curr) => {
		prev[curr] = curr;
		return prev
	}, {}) as RouteNames;
}

export const routeHelper = reactive(new RouteHelper());
