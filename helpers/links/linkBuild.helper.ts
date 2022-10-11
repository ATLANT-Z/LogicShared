export class LinkBuildHelper {
	static getIsAbsolutePath(url) {
		return new RegExp('^(?:[a-z+]+:)?//', 'i').test(url);
	}

	static formatUrl(url: string | undefined) {
		if (!url) return url;
		if (this.getIsAbsolutePath(url)) return url;
		if (url[0] !== '/') return '/' + url;
		return url;
	}
}
