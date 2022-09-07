import {reactive} from "vue";
import {popupHelper, PopupName} from "@shared/helpers/popup.helper";

type PromiseCallbacks = {
	resolve: (...args: any[]) => void
	reject: (...args: any[]) => void
}

export class PopupService {
	private popupState: Record<PopupName, boolean> = {} as any;
	private popupProps: Record<PopupName, any> = {} as any;
	private popupPromises: Record<PopupName, PromiseCallbacks> = {} as any;

	names = popupHelper.names;

	globalListId = 'global-popup-list';
	authListId = 'auth-popup-list';

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

	getCallbacks(id: PopupName): PromiseCallbacks | null {
		return this.popupPromises[id] || null;
	}

	show(id: PopupName, props?: any): Promise<any> {
		this.popupState[id] = true;

		if (props) this.popupProps[id] = props;

		return new Promise<any>((resolve, reject) => {
			this.popupPromises[id] = {
				resolve,
				reject
			}
		}).finally(() => {
			this.popupPromises[id] = {} as any;
		})
	}

	close(id: PopupName) {
		this.popupState[id] = false;
	}
}

export const popupService = reactive(new PopupService());
