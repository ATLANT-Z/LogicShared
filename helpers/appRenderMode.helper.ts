enum AppRenderMode {
	server = 'server',
	client = 'client'
}

export class AppRenderModeHelper {
	private static envKey: string = 'VUE_APP_RENDER_MODE';

	static getIsServer() {
		return !process['client'];
	}

	static getIsClient() {
		return process['client'] || process.env[AppRenderModeHelper.envKey] === AppRenderMode.client;
	}
}
