const dataToArr = {
	id: 1,
	name: {
		regex: 1
	},
}

type DataKeysType<Data> = (keyof Data);
type DataFieldType<Data, T> = T extends DataKeysType<Data> ? Data[T] : never;

type MappedDataTuple<Data, T extends DataKeysType<Data>[]> = {
	[K in keyof T]: DataFieldType<Data, T[K]>;
}

function getKeysValues<Data, T extends DataKeysType<Data>[]>(data: Data, ...keys: T): MappedDataTuple<Data, T> {
	return (keys as any).map(k => data[k]);
}

// const value: [number, string]
const arrDataValues = getKeysValues(dataToArr, 'name');


export interface HasJson {
	toJSON()
}

export type JsonFor<T> = T extends HasJson ? ReturnType<T['toJSON']> : never;

export class JSONInitializer {
	static isJSONBelongToModel<T extends HasJson>(model: T, data: any): data is JsonFor<T> {
		const jsonKeys = Object.keys(data);
		const modelJsonKeys = Object.keys(model.toJSON())

		return modelJsonKeys.every(el => jsonKeys.includes(el));
	}

	static initFromJSON<T extends HasJson>(model: T, data: any) {
		if (JSONInitializer.isJSONBelongToModel(model, data)) {
			const modelJsonKeys = Object.keys(model.toJSON());

			modelJsonKeys.forEach((key) => {
				model[key] = data[key];
			});

			// modelJsonKeys.forEach((key) => {
			// 	if (typeof data[key] === typeof {}) {
			// 		// model[key] = new ClassList[key](data[key])
			// 	} else if (typeof model[key] === typeof data[key])
			// 		model[key] = data[key];
			// 	else {
			// 		throw `Ошибка, данные не соответствуют ожидаемой модели ${model.constructor.name}
			// 		Тип ключа '${key}' model '${typeof model[key]}' и json '${typeof data[key]}':${data[key]} не совпадают.`
			// 	}
			// });
		} else {
			throw `Ошибка, данные не соответствуют ожидаемой модели ${model.constructor.name}`
		}
	}
}

export class Dog {
	constructor(public name: string) {
	}

	bark() {
		console.log(this.name + 'barks')
	}
}

function LogClass(constructor: Function) {
	console.log('=============1');
	console.log(constructor.name);
	console.log(constructor);
	console.log('#############1');
}

function LogMethod(target: any, propName: string | Symbol, decs: PropertyDescriptor, ...args: any[]) {
	console.log('=============3');
	console.log(target);
	console.log(propName)
	console.log(decs);
	console.log(args);
	console.log('#############3');
}

type Primitives = 'number' | 'string' | 'boolean' | 'bigint' | 'symbol' | 'undefined' | 'null' | 'object' | "function"

const SaveBase = {}

function Save(type?: Primitives[] | Primitives | Function) {
	if (!type) return () => {
	}

	return function (target: any, propName: string | Symbol, ...args: any[]) {
		if (Array.isArray(type)) {

		}
		console.log('=============2');
		console.log(target);
		console.log(propName)
		console.log(args);
		console.log('#############2');
	}
}


// const testUser = new User({id: 1, email: '', name: ''});

type UserJson = {
	id: number | string,
	name: string,
	email: string
}

type CurrencySign = '₽' | '€' | '£';

const currencySigns: ReadonlyArray<CurrencySign> = ['€', '£', '₽', '€'];


type Payment = {
	amount: number;
	currency: string;
	currencySign?: CurrencySign;
}

const myPayment: Payment = {
	amount: 100,
	currency: 'руб',
	currencySign: '₽'
}

type ObjectKey<Obj> = keyof Obj;

type PaymentKey = ObjectKey<Payment>;

const key: PaymentKey = 'currency'

const a: PaymentKey = 'amount'

const Store = {
	state: {
		id: 5
	},
	getters: {
		getSupID(state: typeof Store['state']) {
			return state.id;
		},
		getSup(state: typeof Store['state']) {
			return state.id;
		},
		get(state: typeof Store['state']) {
			return {
				a: state.id
			}
		}
	}
}

type MyStore = typeof Store;
type TMapGetters = keyof typeof Store.getters;


interface Mapper<R> {
	<Key extends string>(map: Key[]): { [K in Key]: R };

	<Map extends Record<string, string>>(map: Map): { [K in keyof Map]: R };
}

function getPropertyValue<Obj, Key extends keyof Obj>(obj: Obj, key: Key): Obj[Key] {
	return obj[key];
}

if (getPropertyValue(myPayment, 'currencySign') === '₽') {
	console.log('Рубль');
}


// console.log(typeof {})
// console.log(typeof [])
// console.log(typeof testUser)

type MyExclude<T, U extends T> = T extends U ? never : T;

type cc = MyExclude<keyof MyStore, 'state'>;
type ccc = Pick<MyStore, 'state'>;

const key2: cc = 'getters'

let arr1 = [{a: 1}, {a: '2'}, {a: 3}, {a: 4}, {a: 5}, {a: 6}, {a: 7}, {a: 7}, {a: 8}, {a: 435}, {a: 34}, {a: 534}, {a: 534}, {a: 6}, {a: 45}, {a: 46443643}, {a: 6}, {a: 464364}, {a: 536}, {a: 45}, {a: 6}, {a: 211421}, {a: 4}, {a: 231}, {a: 4}, {a: 2134}, {a: 1564}, {a: 361}, {a: 1346}];
let arr2 = [{a: 1}, {a: '2'}, {a: 3}, {a: 4}, {a: 5}, {a: 6}, {a: 7}, {a: 7}, {a: 8}, {a: 435}, {a: 34}, {a: 534}, {a: 534}, {a: 6}, {a: 45}, {a: 46443643}, {a: 6}, {a: 464364}, {a: 536}, {a: 45}, {a: 6}, {a: 211421}, {a: 4}, {a: 231}, {a: 4}, {a: 2134}, {a: 1564}, {a: 361}, {a: 1346}];

arr1.push(...arr1)
arr1.push(...arr1)
arr1.push(...arr1)
arr1.push(...arr1)
arr1.push(...arr1)
arr1.push(...arr1)
arr1.push(...arr1)
arr1.push(...arr1)

arr2.push(...arr2)
arr2.push(...arr2)
arr2.push(...arr2)
arr2.push(...arr2)
arr2.push(...arr2)
arr2.push(...arr2)
arr2.push(...arr2)
arr2.push(...arr2)


arr1.push({a: 'last'});
arr2.push({a: 'last'});

const item1 = arr1[arr1.length - 1];
const item2 = arr2[arr2.length - 1];

console.log(item1);
console.log(item2);

console.log('length: ' + arr1.length + ' - ' + arr2.length)


// let arr1 = [{a: 1}, {a: 123}, ...]

const remove1 = (item) => {
	return arr1.filter(el => el.a !== item.a);
}

const remove2 = (item) => {
	const index = arr2.findIndex(el => el.a === item.a)
	arr2.splice(index, 1)
}

console.time('rm1');
arr1 = remove1(item1);
console.timeEnd('rm1');

console.time('rm2');
remove2(item2);
console.timeEnd('rm2');

console.log('length: ' + arr1.length + ' - ' + arr2.length)

arr2 = []

function move(arr, val) {
	let j = 0, i = 0;
	const l = arr.length

	for (; i < l; i++) {
		if (arr[i] !== val) {
			arr[j] = arr[i];
			j++
		}
	}
	arr.length = j;
}

const arr3 = [1, 8, 9, 3, 4, 9];

console.log(arr3);
move(arr3, 9);
console.log(arr3);

type PropType<Obj, Prop extends keyof Obj> = Obj[Prop];

// function Log(constructor: Function) {
//   console.log(constructor)
// }
//
// function Log2(target: any, propName: string | Symbol) {
//   console.log(target)
//   console.log(propName)
// }
//
// function Log3(target: any, propName: string | Symbol, descriptor: PropertyDescriptor) {
//   console.log(target)
//   console.log(propName)
//   console.log(descriptor)
// }

// interface ComponentDecorator {
//   selector: string
//   template: string
// }
//
// function Component(config: ComponentDecorator) {
//   return function
//     <T extends { new(...args: any[]): object } >
//   (Constructor: T) {
//     return class extends Constructor {
//       constructor(...args: any[]) {
//         super(...args)
//
//         const el = document.querySelector(config.selector)!
//         el.innerHTML = config.template
//       }
//     }
//   }
// }
//
// function Bind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
//   const original = descriptor.value
//
//   return {
//     configurable: true,
//     enumerable: false,
//     get() {
//       return original.bind(this)
//     }
//   }
// }
//
// @Component({
//   selector: '#card',
//   template: `
//     <div class="card">
//       <div class="card-content">
//         <span class="card-title">Card Component</span>
//       </div>
//     </div>
//   `
// })
// class CardComponent {
//   constructor(public name: string) {
//   }
//
//   @Bind
//   logName(): void {
//     console.log(`Component Name: ${this.name}`)
//   }
// }
//
// const card = new CardComponent('My Card Component')
//
// const btn = document.querySelector('#btn')!
//
// btn.addEventListener('click', card.logName)

// ================

type ValidatorType = 'required' | 'email'

interface ValidatorConfig {
	[prop: string]: {
		[validateProp: string]: ValidatorType
	}
}

const validators: ValidatorConfig = {}

function Required(target: any, propName: string) {
	validators[target.constructor.name] = {
		...validators[target.constructor.name],
		[propName]: 'required'
	}
}

function validate(obj: any): boolean {
	const objConfig = validators[obj.constructor.name]
	if (!objConfig) {
		return true
	}
	let isValid = true
	Object.keys(objConfig).forEach(key => {
		if (objConfig[key] === 'required') {
			isValid = isValid && !!obj[key]
		}
	})
	return isValid
}

// class Form {
//   @Required
//   public email: string | void
//
//   constructor(email?: string) {
//     this.email = email
//   }
// }
//
// const form = new Form('v@mail.ru')
//
// if (validate(form)) {
//   console.log('Valid: ', form)
// } else {
//   console.log('Validation Error')
// }
//

// declare global {
// 	interface Array<T> {
// 		multi(n: number): T extends number ? Array<number> : never;
//
// 		remove(o: T): Array<T>;
// 	}
// }
//
// Array.prototype.multi = function (n) {
// 	return this.map(el => el * n)
// }
//
// console.log(['1', 'f.,1@121m', 3, 4].multi(5));


type Filter<T, U extends T> = T extends U ? never : T;

type R = Filter<'a' | 'b' | 'c', 'c'>

type MyGetter = (...args) => any;
type MyStoreGetters = MyStore['getters'];
type StoreGetterList = keyof MyStoreGetters;


interface IMap {
	<Key extends StoreGetterList>(keys: Key[]): {
		[K in Key]: MyStoreGetters[K]
	}

	<Key extends string>(keys: Key[]): {
		[K in Key]: MyStoreGetters[K]
	}
}


const myMapGetters: IMap = (keys: StoreGetterList[]) => {
	const obj = {}
	keys.forEach(el => {
		obj[el] = Store.getters[el];
	})
	return obj
}

const getters = {
	...myMapGetters(['get', 'getSupID'])
}

type Currencies = 'RUB' | 'USD' | 'EURO'
type Separators = '-' | '_' | ' '

type PermutateAll<C extends Currencies, Separator extends Separators> = `${C}${Separator}${C}`;

const a111: PermutateAll<Currencies, Separators> = 'EURO-USD';

// External modules/types
interface Model {
	id: number;
}
interface UserModel extends Model {
	name: string;
}

class Application<ServiceNames extends string = any, Models extends { [service in ServiceNames]: Model } = any> {
	constructor(models: Models) {
		this.models = models;
	}
	public models: Models;
}

// My app
const app = new Application( {
	User: {
		id: 1,
		name: 'Kent',
	} as UserModel,
});

let n = app.models.User.id // inferred as string
