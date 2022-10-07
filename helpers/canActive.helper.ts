import {reactive} from "vue";
import {EnumHelper} from "@shared/helpers/enum.helper";
import {CAN_ACTIVE_IDS} from "@services/enum/canActive.enum";

export type CanActiveName = keyof typeof CAN_ACTIVE_IDS;
export type CanActiveNames<T extends string = CanActiveName> = Record<T, T>

export class CanActiveHelper {
	names: CanActiveNames = EnumHelper.getEnumMap(CAN_ACTIVE_IDS) as CanActiveNames;
}

export const canActiveHelper = reactive(new CanActiveHelper());
