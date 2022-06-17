import {reactive} from "vue";

class PopupShowService {
	popupState: Record<string, boolean> = {};

	isShow(id: string) {
		return this.popupState[id];
	}

	setShow(id: string, isShow: boolean) {
		this.popupState[id] = isShow;
	}
}

export const popupShowService = reactive(new PopupShowService());
