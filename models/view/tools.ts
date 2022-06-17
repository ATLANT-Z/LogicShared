import {IUiSelectValue} from "@/_shared/models/tools/type";

declare global {
	interface Array<T> {
		toUiSelectValues(model?: keyof T, show?: keyof T): IUiSelectValue[];
	}
}

Array.prototype.toUiSelectValues = function (model, show) {
	//Если примитивное значение, его же и отдаем
	let mapAlg = el => ({
		model: el,
		show: el
	});

	//Объекты к строке
	if (typeof this[0] === 'object') {
		mapAlg = el => ({
			model: el.toString(),
			show: el.toString()
		})
	}

	//Если значения переданы, обрабатываем
	if (model) {
		if (!show) show = model;

		mapAlg = el => ({
			model: el[model],
			show: el[show!]
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

const funcIdList = {}

export function doAfterDelay(id: string, delay: number, cb: (...any) => any) {
	if (funcIdList[id])
		clearTimeout(funcIdList[id])

	funcIdList[id] = setTimeout(() => {
		cb();
	}, delay)
}
