import {ILocaleableValue, Jsonable} from "@/_shared/models/tools/tools";
import {LocaleableValue} from "@/_shared/services/translate.service";

export class HomeSliderItem extends Jsonable<HomeSliderItem>() {
	@ILocaleableValue() title: LocaleableValue;
	@ILocaleableValue() content: LocaleableValue;

	@ILocaleableValue() image: LocaleableValue;

	@ILocaleableValue() backgroundColor: LocaleableValue;

	@ILocaleableValue() url: LocaleableValue | undefined;
	@ILocaleableValue() buttonText?: LocaleableValue;
}
