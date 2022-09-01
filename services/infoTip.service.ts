import {reactive} from "vue";

export type InfoTipState = {
	text: string,
	isActive: boolean,
	isLeft: boolean,
	isTop: boolean,
	x: number,
	y: number,
}

class InfoTipService {
	state: InfoTipState = {
		text: '',
		isActive: false,
		isLeft: true,
		isTop: true,
		x: 0,
		y: 0
	}

	setState(state: InfoTipState) {
		this.state = state;
	}
}

export const infoTipService = reactive(new InfoTipService());
