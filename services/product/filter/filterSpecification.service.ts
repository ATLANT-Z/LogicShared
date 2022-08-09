import {FilterSpecification} from "@shared/models/product/filter/specification";

export class FilterSpecificationExtractorService {
	private static typeName: string = 'Тип';
	private static separateNames: string[] = [
		FilterSpecificationExtractorService.typeName
	]

	static getTypes(list: FilterSpecification[]): FilterSpecification | undefined {
		return list.find(el => el.name.contains(this.typeName))
	}

	static getMain(list: FilterSpecification[]): FilterSpecification[] {
		return list.filter(el => this.separateNames.some(name => !el.name.contains(name)))
	}
}
