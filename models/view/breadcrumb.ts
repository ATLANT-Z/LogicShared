import {RouteName} from "@shared/helpers/route.helper";
import {VueLink} from "@/tools/version-types";
import {LocaleableValue} from "@shared/models/translate/localeableValue";


export interface Breadcrumb {
	name: LocaleableValue;
	vueLinkOrRouteName: RouteName | VueLink;
	counter?: number
}
