import {EntryCollection, Metadata, Sys} from "contentful";
import {ILocaleableValue} from "@/_shared/services/translate.service";

export type ContentfulResponse<T> = Promise<ContentfulEntryList<T>>
export type ContentfulEntryList<T> = EntryCollection<T>

export interface CNTFFile {
	url: string;
	details: {
		size: number;
		image?: {
			width: number;
			height: number;
		};
	};
	fileName: string;
	contentType: string;
}

export interface CNTFAsset {
	sys: Sys;
	fields: {
		title: ILocaleableValue;
		description: ILocaleableValue;
		file: ILocaleableValue<CNTFFile>
	};
	metadata: Metadata;

	toPlainObject(): object;
}

