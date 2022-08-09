import {reactive} from "vue";
import {popupHelper, PopupName} from "@shared/helpers/popup.helper";

export class PopupService {
	///TODO добавить имена для всех айдишек.
	private popupState: Record<string, boolean> = {};
	private popupProps: Record<string, any> = {};

	names = popupHelper.names;

	globalListId = 'global-popup-list'

	get TeleportToId() {
		return '#' + this.globalListId
	}

	isShow(id: string) {
		return this.popupState[id];
	}

	setShow(id: string, isShow: boolean) {
		this.popupState[id] = isShow;
	}

	getProps(id: PopupName) {
		return this.popupProps[id];
	}

	show(id: PopupName, props?: any) {
		this.popupState[id] = true;

		if (props) this.popupProps[id] = props;
	}

	close(id: PopupName) {
		this.popupState[id] = false;
	}
}

export const popupService = reactive(new PopupService());
