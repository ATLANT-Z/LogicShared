import {App} from "vue";
import {DictionaryWord, translateService} from "@shared/services/translate.service";
import {popupShowService} from "@shared/services/popup.service";
import {Icon, projectIcons} from "@shared/type/icons";
import {routeHelper, RouteHelper} from "@shared/helpers/route.helper";

type GlobalFunctionList = ReturnType<typeof globalFunctions>

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$globalFunc: GlobalFunctionList;
		_T: GlobalFunctionList['translate'];
		icons: Record<Icon, Icon>;
		routeHelper: RouteHelper
	}
}

function globalFunctions(app: App) {
	return {
		translate(word: DictionaryWord, params?: any) {
			return translateService.getWord(word, {$params: params});
		},
		getCoords(elem: Element) {
			const box = elem.getBoundingClientRect();
			return {
				top: box.top + pageYOffset,
				left: box.left + pageXOffset,
			};
		},
		getIco(name: string) {
			// let src = require(`@/assets/icons/${name}`);
			// if (src?.default) src = src.default;
			return import(`@/assets/icons/${name}`);
		},
		getBgIco(name: string) {
			return "url(" + app.config.globalProperties.$getIco(name) + ")";
		},
		toggleActive(el: HTMLElement) {
			el.classList.toggle('active');
		},
		showId(id: string, hasListener = true) {
			if (hasListener) {
				popupShowService.setShow(id, true);
			} else {
				document.getElementById(id)!.classList.add("show");
			}
		}
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

		app.config.globalProperties.icons = createIcons();

		app.config.globalProperties.routeHelper = routeHelper;
		// Object.entries(globalFunctions(app)).forEach(el => {
		// 	const [key, func] = el;
		// 	console.log(el);
		// 	app.provide(key, func);
		// });
	},
};
