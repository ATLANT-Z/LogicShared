import {RouteName} from "@shared/helpers/route.helper";
import {LocaleableValue} from "@shared/services/translate.service";
import {VueLink} from "@/tools/version-types";


export interface Breadcrumb {
	name: LocaleableValue;
	vueLinkOrRouteName: RouteName | VueLink;
	counter?: number
}
