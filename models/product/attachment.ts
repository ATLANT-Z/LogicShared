import {Type} from "class-transformer";
import {ILocaleableValue} from "@/_shared/models/tools/tools";
import {LocaleableValue} from "@shared/models/translate/localeableValue";
import {DictLanguage} from "@shared/models/translate/types";

export interface IHasUrl {
	url: string;
}

export class Img implements IHasUrl {
	locales: DictLanguage[];
	url: string;
	@Type(() => Thumbnail) thumbnails: Thumbnail[]
}

export class Thumbnail implements IHasUrl {
	url: string;
	type: THUMBNAIL_TYPE
}

export enum THUMBNAIL_TYPE {
	TILE = 'tile',
}

export class Attachment {
	group: string;
	@Type(() => MyFile) files: MyFile[];
}

export class MyFile implements IHasUrl {
	@ILocaleableValue() name: LocaleableValue;
	url: string;
	extension: string;
}
