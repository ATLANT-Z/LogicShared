import {CNTFAsset} from "@/_shared/models/contentful/type";
import {LocaleableValue} from "@shared/models/translate/localeableValue";

type ContentModel = Record<string, LocaleableValue<any>>

export class CNTFTransformer {
	static isAsset(val): val is CNTFAsset {
		return val?.sys?.type === 'Asset'
	}

	static transformAsset(val: CNTFAsset) {
		return {
			ru: val.fields.file.ru.url,
			uk: val.fields.file.uk?.url,
		}
	}

	static transform(data: ContentModel) {
		Object.keys(data).forEach(key => {
			if (CNTFTransformer.isAsset(data[key].ru)) {
				data[key] = CNTFTransformer.transformAsset(data[key].ru) as any;
			}
		})
		return data;
	}
}

// export class MyCNTFImage extends LocaleableValue {
//
// }
