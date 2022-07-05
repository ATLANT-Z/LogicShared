import {Router} from "vue-router";
import {Vue} from "vue-class-component";

class VueToolsProviderService {
	router: Router;

	init(app: Vue) {
		this.router = app.$router;
	}
}

export const vueTools = new VueToolsProviderService();
