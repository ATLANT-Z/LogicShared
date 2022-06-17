import {helpers, maxLength, minLength, required, sameAs} from "@vuelidate/validators";
import {DictionaryWord, translateService} from "@/_shared/services/translate.service";
import {
	emailRegExp,
	noSpacesRegExp,
	password3digitInARowRegExp,
	passwordRegExp,
	urlRegExp
} from "@/_shared/models/validators/regExp";
import {ValidationRule} from "@vuelidate/core";

// const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


export const rule = function (word: DictionaryWord, rule: ValidationRule) {
	return helpers.withMessage((props) => translateService.getWord(word, props), rule);
};

export const ruleRegExp = function (word: DictionaryWord, regExp: RegExp) {
	return helpers.withMessage((props) => translateService.getWord(word, props), helpers.regex(regExp));
};

export const myRequired = rule('requiredField', required);
export const mustBeTrue = (word: DictionaryWord) => rule(word, sameAs(true))

// export const mustBeTrimmed = ruleRegExp('trimmedRegExp', trimmedRegExp);
export const noSpaces = ruleRegExp('noSpacesRegExp', noSpacesRegExp);

export const email = () => {
	return {
		email: ruleRegExp('emailRegExp', emailRegExp),
		maxLength: rule('maxLength', maxLength(320)),
	}
};

export const phone = () => {
	return {
		phoneFormat: rule('phoneFormat', helpers.withParams(
			{type: 'phoneFormat'},
			(value) => {
				const number = phoneUtil.parseAndKeepRawInput(value);
				return phoneUtil.isValidNumber(number);
			}
		)),
	}
};

export const password = () => {
	return {
		password: ruleRegExp('passwordRegExp', passwordRegExp),
		password3digitInARow: ruleRegExp('password3SameDigitInARowRegExp', password3digitInARowRegExp),
		minLength: rule('minLength', minLength(6))
	}
};
export const correctUrl = () => {
	return {
		format: ruleRegExp('urlRegExp', urlRegExp),
		maxLength: rule('maxLength', maxLength(2083)),
	}
};

export const standardStrLength = rule('maxLength', maxLength(255));

// export const requiredOnlyOneOf = <T, Key extends keyof T>(obj: T, key: Key) => {
// 	return {
// 		"oneOfMustBeEmpty": {
// 			"ru": "Одно из полей должно пыть пустым",
// 			"en": "EU Одно из полей должно пыть пустым",
// 			"uk": "UA Одно из полей должно пыть пустым"
// 		},
// 		oneOfMustBeEmpty: rule('oneOfMustBeEmpty', helpers.withParams(
// 			{type: 'mustBeEmpty'},
// 			(value) => {
// 				if (obj[key]) {
// 					return !value
// 				}
// 				return true;
// 			}
// 		)),
// 		requiredIf: rule('requiredField', requiredIf(() => {
// 			return !obj[key];
// 		})),
// 	}
// };
