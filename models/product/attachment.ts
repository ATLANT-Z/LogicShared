import {LocaleableValue} from "@/_shared/services/translate.service";
import {Type} from "class-transformer";
import {ILocaleableValue} from "@/_shared/models/tools/tools";

export interface Group {
	id: string;
	name: string;
}

export class ImgFile {
	@ILocaleableValue() name: LocaleableValue;
	url: string;
	extension: string;
}

export class Attachment {
	group: Group;

	@Type(() => ImgFile)
	files: ImgFile[];
}
