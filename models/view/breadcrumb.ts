import {RouteName} from "@shared/helpers/route.helper";
import {VueLink} from "@shared/models/tools/type";
import {LocaleableValue} from "@shared/services/translate.service";


export interface Breadcrumb {
	name: LocaleableValue;
	vueLinkOrRouteName: RouteName | VueLink;
	counter?: number
}
