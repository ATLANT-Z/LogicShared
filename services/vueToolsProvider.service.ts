import {Router} from "vue-router";
import {Vue} from "@/tools/version-types";

class VueToolsProviderService {
	router: Router | undefined;

	init(app: Vue) {
		this.router = app.$router;
	}
}

export const vueTools = new VueToolsProviderService();
