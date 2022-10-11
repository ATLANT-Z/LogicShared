export class EmailLinkHelper {
	constructor(public email: string) {
	}

	get EmailLink() {
		return 'mailto:' + this.email;
	}
}
