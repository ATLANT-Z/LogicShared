import {translateService} from "@shared/services/translate/translate.service";
import {projectIcons} from "@shared/type/icons";
import {LocaleableValue} from "@shared/models/translate/localeableValue";
import {DictionaryWord} from "@shared/models/translate/types";

export function globalFunctions() {
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

export function createIcons() {
	const icons = {};
	Object.keys(projectIcons).forEach(el => icons[el] = el);
	return icons;
}

