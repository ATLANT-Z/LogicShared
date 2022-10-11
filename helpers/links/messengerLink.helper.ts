import {FormatPhoneHelper} from "@shared/helpers/view/formatPhone.helper";

export class MessengerLinkHelper {
	constructor(public phone: string) {
	}

	get TelegramLink() {
		return 'https://t.me/' +
			FormatPhoneHelper
				.formatPhone(this.phone)
				.replaceAll(' ', '');
	}

	get ViberLink() {
		return 'viber://chat?number=' +
			FormatPhoneHelper
				.formatPhoneWithoutPlus(this.phone)
				.replaceAll(' ', '');
	}
}
