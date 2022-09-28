import {IHasPrice, IProductQuantity} from "@shared/models/product/product";
import {Money} from "@shared/models/money/money";
import {Currency} from "@shared/models/money/currency";
import {reactive} from "vue";

export class ProductViewService {
	static getTotalSum(productContainer: IProductQuantity): Money {
		const price = productContainer.product.Price ? productContainer.product.Price.amount : 0;
		const currency = productContainer.product.Price ? productContainer.product.Price.currency : Currency.UAH;

		return reactive({
			amount: price * productContainer.quantity,
			currency: currency
		});
	}

	static getTotalForMe(hasPrice: IHasPrice): Money {
		const price = hasPrice.price ? hasPrice.price.amount : 0;
		const currency = hasPrice.price ? hasPrice.price.currency : Currency.UAH;

		return reactive({
			amount: price * hasPrice.quantity,
			currency: currency
		});
	}
}
