import {IUiSelectValue} from "@/_shared/models/tools/type";

declare global {
	interface Array<T> {
		toUiSelectValues(model?: keyof T, show?: keyof T, show2?: keyof T): IUiSelectValue[];
	}
}

Array.prototype.toUiSelectValues = function (model, show, show2) {
	//Если примитивное значение, его же и отдаем
	let mapAlg = el => ({
		model: el,
		show: el,
		show2: el,
	});

	//Объекты к строке
	if (typeof this[0] === 'object') {
		mapAlg = el => ({
			model: el.toString(),
			show: el.toString(),
			show2: el.toString(),
		})
	}

	//Если значения переданы, обрабатываем
	if (model) {
		mapAlg = el => ({
			model: el[model],
			show: show ? el[show].toString() : el[model].toString(),
			show2: show2 ? el[show2].toString() : undefined
		})
	}

	return this.map(mapAlg);
}

export function isTouch(e: MouseEvent | TouchEvent): e is TouchEvent {
	return e.type.includes('touch')
}

export function isMouse(e: MouseEvent | TouchEvent): e is MouseEvent {
	return e.type.includes('mouse')
}

export function isEmpty(val) {
	return (val === undefined || val == null || val.length <= 0);
}

export function isExist(val) {
	return !isEmpty(val)
}

const funcIdList = {}

export function doAfterDelay(id: string, delay: number, cb: (...any) => any) {
	if (funcIdList[id])
		clearTimeout(funcIdList[id])

	funcIdList[id] = setTimeout(() => {
		cb();
	}, delay)
}
