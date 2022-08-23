export class MoneyViewService {
	private static numberFormat = Intl.NumberFormat('ru-RU', {maximumFractionDigits: 2, minimumFractionDigits: 2});

	static format(val: number) {
		return MoneyViewService.numberFormat.format(val).replace(',', '.');
	}
}
