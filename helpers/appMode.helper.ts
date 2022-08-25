enum AppMode {
	dev = 'dev',
	prod = 'prod'
}

export class AppModeHelper {
	private static envKey: string = 'VUE_APP_BUILD_MODE';

	static getIsProd() {
		return process.env[AppModeHelper.envKey] === AppMode.prod;
	}

	static getIsDev() {
		return process.env[AppModeHelper.envKey] === AppMode.dev;
	}
}
