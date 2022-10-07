import {reactive} from "vue";
import {canActiveHelper, CanActiveName} from "@shared/helpers/canActive.helper";
import {setObjectValue} from "~/tools/version-func";
import {Vue} from "~/tools/version-types";

type PromiseCallbacks = {
	resolve: (...args: any[]) => void
	reject: (...args: any[]) => void
}

export class CanActiveService {
	state: Record<CanActiveName, boolean> = {} as any;
	private props: Record<CanActiveName, any> = {} as any;
	private promises: Record<CanActiveName, PromiseCallbacks> = {} as any;

	names = canActiveHelper.names;

	isShow(id: string) {
		return this.state[id];
	}

	setShow(id: string, isActive: boolean, excludedIds: string[] = []) {
		setObjectValue(this.state, id, isActive);

		excludedIds
			.filter(fId => fId !== id)
			.forEach((id) => {
				setObjectValue(this.state, id, false);
			});
	}

	getProps(id: CanActiveName) {
		return this.props[id];
	}

	getCallbacks(id: CanActiveName): PromiseCallbacks | null {
		return this.promises[id] || null;
	}

	show(id: CanActiveName, props?: any): Promise<any> {
		setObjectValue(this.state, id, true);

		if (props) setObjectValue(this.props, id, props);

		return new Promise<any>((resolve, reject) => {
			props && setObjectValue(this.promises, id, {
				resolve,
				reject
			});
		}).finally(() => {
			setObjectValue(this.promises, id, {});
		})
	}

	close(id: CanActiveName) {
		setObjectValue(this.state, id, false);
	}
}

export const canActiveService = reactive(new CanActiveService());
