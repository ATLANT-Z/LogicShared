import {PhoneNumberFormat as PNF} from 'google-libphonenumber';
import {PhoneNumberUtil} from 'google-libphonenumber';

const phoneUtil: PhoneNumberUtil = PhoneNumberUtil.getInstance();

export class FormatPhoneHelper {
	static formatPhone(phone: string) {
		let formattedNumber = phone;
		try {
			const number = phoneUtil.parse(phone, 'UA');
			formattedNumber = phoneUtil.format(number, PNF.INTERNATIONAL);
		} catch (err) {
			console.error(err);
		}
		return formattedNumber;
	}

	static formatPhoneWithoutPlus(phone: string) {
		return this.formatPhone(phone).replace('+', '');
	}
}
