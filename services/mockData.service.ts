import {LogForm} from "@/models/logReg";

type MockEntity<T> = {
	mockName: string,
	entity: Partial<T>
}

class MockDataService {
	logInUserDataList: MockEntity<LogForm>[] = [
		{
			mockName: 'Отсутствие разрешения на вход',
			entity: {
				emailOrPhone: 'a.skubaev@palmagroup.com.ua',
				password: 'A9odZTpm',
			}
		},
		{
			mockName: 'Запрет по бездействию',
			entity: {
				emailOrPhone: 'ponomars@ukr.net',
				password: '701998Off',
			}
		},
		{
			mockName: 'Запрет по наличию задолженности',
			entity: {
				emailOrPhone: 'koltakov@kambio.ua',
				password: '52jrUVU6eS7fZx36',
			}
		},
		{
			mockName: 'Запрет по нарушению рекомендованной цены',
			entity: {
				emailOrPhone: 'sergey.droc@gmail.com',
				password: '3C5x5tX3Fg',
			}
		},
		{
			mockName: 'Запрет по нарушению договора',
			entity: {
				emailOrPhone: 'director@greenmarket.com.ua',
				password: 'fk3u~5M;KuPT65',
			}
		},
	]
}

export const mockDataService = new MockDataService()
