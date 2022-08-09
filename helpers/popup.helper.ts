import {reactive} from "vue";
import {EnumHelper} from "@shared/helpers/enum.helper";
import {POPUP_NAMES} from "@services/enum/popup.enum";

export type PopupName = keyof typeof POPUP_NAMES;
export type PopupNames<T extends string = PopupName> = Record<T, T>

export class PopupHelper {
	names: PopupNames = EnumHelper.getEnumMap(POPUP_NAMES) as PopupNames;
}

export const popupHelper = reactive(new PopupHelper());
