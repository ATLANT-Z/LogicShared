import {
	ClassTransformOptions,
	Exclude,
	Expose,
	instanceToPlain,
	plainToInstance,
	Transform,
	Type
} from "class-transformer";
import {reactive} from "vue";
import {MyObject} from "@/_shared/models/tools/type";
import {translateService} from "@shared/services/translate/translate.service";
import {LocaleableValue} from "@shared/models/translate/localeableValue";

const decoratorRuleMap = new Map<MyObject, MyObject>();

export function PlainNoTrim() {
	return function (target, propKey) {
		const targetRules = decoratorRuleMap.get(target) || {};
		const propRules = targetRules[propKey] || {};

		propRules['noTrim'] = true

		targetRules[propKey] = propRules;
		decoratorRuleMap.set(target, targetRules);
	}
}

function getPropRule(instance, propKey): MyObject | undefined {
	return (decoratorRuleMap.get(instance.constructor.prototype) || {})[propKey]
}

export function Jsonable<T>() {
	class Jsonable {
		private static formatProp(instance, prop: [string, any]) {
			const key = prop[0];
			let val = prop[1];

			// console.log('pair', key, val);

			if (typeof val === 'string' && !getPropRule(instance, key)?.['noTrim']) {
				this[key] = val = val.trim();
			}

			if (val === null || val === undefined || val === '') {
				delete this[key];
			}
		}

		static toJson(instance: T, options?: ClassTransformOptions): Partial<T> {
			const obj = instanceToPlain(instance, options);
			Object.entries(obj).map(this.formatProp.bind(obj, instance))
			return obj as Partial<T>;
		}

		static toJsonString(instance: T): string {
			return JSON.stringify(this.toJson(instance));
		}

		static fromStringJson(str): T | T[] {
			return plainToInstance(this, JSON.parse(str)) as T | T[];
		}

		static fromJson<Plain extends Partial<T> | Partial<T[] | any>>(dataObj: Plain, options?: ClassTransformOptions): Plain extends Array<any> ? T[] : T {
			return reactive(plainToInstance(this as any, dataObj, options)) as any;
		}
	}

	return Jsonable;
}

export function ILocaleableValue() {
	return (target: MyObject, propertyKey: string | symbol, ...args) => {
		VueRef()(target, propertyKey);
		Type(() => LocaleableValue)(target, propertyKey);
	}
}

export function VueRef(checkIsCanReactive = false) {
	return Transform(({value}) => {
		if (checkIsCanReactive) {
			const iCanReactive = (typeof value === 'object' || Array.isArray(value)) && value !== null;
			if (iCanReactive) return reactive(value)
		}
		return value;
	}, {toClassOnly: true});
}

export function PlainIgnore() {
	return Exclude({toPlainOnly: true});
}

export function PlainLang() {
	return (target: MyObject, propertyKey: string | symbol, ...args) => {
		Expose()(target, propertyKey);
		Transform(() => translateService.getCurrLang(), {toPlainOnly: true})(target, propertyKey);
	}
}

export function PlainNoSpace() {
	return Transform(({value}) => typeof value === 'string' ? value.replaceAll(' ', '') : value, {toPlainOnly: true});
}

export function uid(): string {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function isPromise(p): p is Promise<any> {
	return p !== null &&
		typeof p === 'object' &&
		typeof p.then === 'function' &&
		typeof p.catch === 'function';
}


// const toUnicode = function (str) {
// 	let result = "";
// 	const reg = new RegExp(/[^a-zA-Z\d{}:",]/gmi)
// 	for (let i = 0; i < str.length; i++) {
// 		// Assumption: all characters are < 0xffff
// 		if (reg.test(str[i])) {
// 			result += "\\" + "u" + ("000" + str[i].charCodeAt(0).toString(16)).substr(-4);
// 		} else {
// 			result += str[i];
// 		}
// 	}
// 	return result;
// };
// const info = JSON.stringify({
// 	id: 5,
// 	text: "Супер текст о том как важен, супер важен этот Слай'дер",
// 	url:"https://dev.greenvision.ua/ua/about-company/shipping-payment"
// })
// console.log('info:', info);
//
// const unicode = toUnicode(info);
// console.log('unicode:', unicode);
//
// console.log(JSON.parse(unicode));

