import {Vue, VueRouter} from "@/tools/version-types";

class VueToolsProviderService {
	router: VueRouter | undefined;

	init(app: Vue) {
		this.router = app.$router;
	}
}

export const vueTools = new VueToolsProviderService();
