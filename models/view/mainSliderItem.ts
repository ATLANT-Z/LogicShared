import {ILocaleableValue, Jsonable} from "@/_shared/models/tools/tools";
import {LocaleableValue} from "@shared/models/translate/localeableValue";

export class MainSliderItem extends Jsonable<MainSliderItem>() {
	@ILocaleableValue() title: LocaleableValue;
	@ILocaleableValue() content: LocaleableValue;

	@ILocaleableValue() image: LocaleableValue;

	@ILocaleableValue() backgroundColor: LocaleableValue;

	@ILocaleableValue() url: LocaleableValue | undefined;
	@ILocaleableValue() buttonText?: LocaleableValue;

	@ILocaleableValue() titleAndBtnColor?: LocaleableValue;
	@ILocaleableValue() imgBorderColor?: LocaleableValue;
}
