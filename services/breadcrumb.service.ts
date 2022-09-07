import {Breadcrumb} from "@shared/models/view/breadcrumb";

import {reactive} from "vue";

export class BreadcrumbService {
	breadcrumbList: Breadcrumb[] = [];

	addCrumb(crumb: Breadcrumb) {
		this.breadcrumbList.push(crumb);
	}

	clear() {
		this.breadcrumbList = [];
	}

	private componentList: string[] = [];

	getIsShowComponent(id: string) {
		return this.componentList.indexOf(id) === this.componentList.length - 1;
	}

	signUpBreadcrumb(id: string) {
		this.componentList.push(id);
	}

	signOutBreadcrumb(id: string) {
		this.componentList = this.componentList.filter(registeredId => registeredId !== id);
	}
}

export const breadcrumbService = reactive(new BreadcrumbService());
