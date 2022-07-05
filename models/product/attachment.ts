import {LocaleableValue} from "@/_shared/services/translate.service";
import {Type} from "class-transformer";
import {ILocaleableValue} from "@/_shared/models/tools/tools";

export interface IHasUrl {
	url: string;
}

export class Img implements IHasUrl {
	url: string;
	@Type(() => Thumbnail) thumbnails: Thumbnail[]
}

export class Thumbnail implements IHasUrl {
	url: string;
	type: THUMBNAIL_TYPE
}

enum THUMBNAIL_TYPE {
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
