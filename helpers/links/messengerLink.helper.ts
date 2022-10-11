import {FormatPhoneHelper} from "@shared/helpers/view/formatPhone.helper";

export class MessengerLinkHelper {
	constructor(public phone: string) {
	}

	static getTelegramLink(phone: string) {
		return 'https://t.me/' +
			FormatPhoneHelper
				.formatPhone(phone)
				.replaceAll(' ', '');
	}


	get TelegramLink() {
		return MessengerLinkHelper.getTelegramLink(this.phone);
	}

	static getViberLink(phone: string) {
		return 'viber://chat?number=' +
			FormatPhoneHelper
				.formatPhoneWithoutPlus(phone)
				.replaceAll(' ', '');
	}

	get ViberLink() {
		return MessengerLinkHelper.getViberLink(this.phone);
	}
}
