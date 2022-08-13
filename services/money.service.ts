export class MoneyService {
	private static numberFormat = Intl.NumberFormat('ru-RU', {maximumFractionDigits: 2, minimumFractionDigits: 2});

	static format(val: number) {
		return MoneyService.numberFormat.format(val).replace(',', '.');
	}
}
