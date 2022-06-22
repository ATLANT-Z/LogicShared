import {LocaleableValue} from "@/_shared/services/translate.service";
import {Type} from "class-transformer";
import {ILocaleableValue} from "@/_shared/models/tools/tools";

export class ImgFile {
	@ILocaleableValue() name: LocaleableValue;
	url: string;
	extension: string;
}

export class Attachment {
	group: string;

	@Type(() => ImgFile)
	files: ImgFile[];
}
