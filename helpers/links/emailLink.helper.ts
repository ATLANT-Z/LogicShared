export class EmailLinkHelper {
	constructor(public email: string) {
	}

	static getEmailLink(email: string) {
		return 'mailto:' + email;
	}

	get EmailLink() {
		return EmailLinkHelper.getEmailLink(this.email);
	}
}
