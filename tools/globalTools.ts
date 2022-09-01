import {App} from "vue";
import {DictionaryWord, LocaleableValue, translateService} from "@shared/services/translate.service";
import {PopupService, popupService} from "@shared/services/popup.service";
import {Icon, projectIcons} from "@shared/type/icons";
import {routeHelper, RouteHelper} from "@shared/helpers/route.helper";
import {breadcrumbService, BreadcrumbService} from "@shared/services/breadcrumb.service";

type GlobalFunctionList = ReturnType<typeof globalFunctions>

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$globalFunc: GlobalFunctionList;
		_T: GlobalFunctionList['translate'];
		getLocaleable: GlobalFunctionList['getLocaleable']
		icons: Record<Icon, Icon>;
		routeHelper: RouteHelper
		popupService: PopupService
		breadcrumbService: BreadcrumbService
	}
}

function globalFunctions(app: App) {
	return {
		translate(word: DictionaryWord, params?: any) {
			return translateService.getWord(word, {$params: params});
		},
		getLocaleable(word: DictionaryWord, params?: any): LocaleableValue {
			return translateService.getLocaleable(word, {$params: params});
		},
		getCoords(elem: Element) {
			const box = elem.getBoundingClientRect();
			return {
				top: box.top + pageYOffset,
				left: box.left + pageXOffset,
				right: box.right + pageXOffset,
			};
		},
		// getIco(name: string) {
		// 	// let src = require(`@/assets/icons/${name}`);
		// 	// if (src?.default) src = src.default;
		// 	return import(`@/assets/icons/${name}`);
		// },
		// getBgIco(name: string) {
		// 	return "url(" + app.config.globalProperties.$getIco(name) + ")";
		// },
		toggleActive(el: HTMLElement) {
			el.classList.toggle('active');
		},
		// showId(id: string) {
		// 	// document.getElementById(id)!.classList.add("show");
		// }
	}
}

function createIcons() {
	const icons = {};
	Object.keys(projectIcons).forEach(el => icons[el] = el);
	return icons;
}

export default {
	// eslint-disable-next-line no-unused-vars
	install(app: App, options: any | unknown) {
		const func = globalFunctions(app)
		app.config.globalProperties.$globalFunc = func;
		app.config.globalProperties._T = func.translate;
		app.config.globalProperties.getLocaleable = func.getLocaleable;

		app.config.globalProperties.icons = createIcons();

		app.config.globalProperties.routeHelper = routeHelper;
		app.config.globalProperties.popupService = popupService;

		app.config.globalProperties.breadcrumbService = breadcrumbService;

		// Object.entries(globalFunctions(app)).forEach(el => {
		// 	const [key, func] = el;
		// 	console.log(el);
		// 	app.provide(key, func);
		// });
	},
};
