import {reactive} from "vue";
import {popupHelper, PopupName} from "@shared/helpers/popup.helper";
import {setObjectValue} from "@/tools/version-func";

type PromiseCallbacks = {
	resolve: (...args: any[]) => void
	reject: (...args: any[]) => void
}

export class PopupService {
	private popupState: Record<PopupName, boolean> = reactive({}) as any;
	private popupProps: Record<PopupName, any> = reactive({}) as any;
	private popupPromises: Record<PopupName, PromiseCallbacks> = reactive({}) as any;

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
		setObjectValue(this.popupState, id, isShow);
	}

	getProps(id: PopupName) {
		return this.popupProps[id];
	}

	getCallbacks(id: PopupName): PromiseCallbacks | null {
		return this.popupPromises[id] || null;
	}

	show(id: PopupName, props?: any): Promise<any> {
		setObjectValue(this.popupState, id, true);

		if (props) setObjectValue(this.popupProps, id, props);

		return new Promise<any>((resolve, reject) => {
			setObjectValue(this.popupPromises, id, {
				resolve,
				reject
			});
		}).finally(() => {
			setObjectValue(this.popupPromises, id, {});
		})
	}

	close(id: PopupName) {
		setObjectValue(this.popupState, id, false);
	}
}

export const popupService = reactive(new PopupService());
