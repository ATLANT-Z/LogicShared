import {Jsonable} from "@shared/models/tools/tools";
import {Transform, Type} from "class-transformer";
import {IFilterItem} from "@shared/models/view/product/types";
import {FilterSpecification} from "@shared/models/product/filter/specification";

export class HttpCriteria {
	priceRange: HttpPriceRange;

	manufacturers: Manufacturer[];

	specifications: FilterSpecification[];
}

export class Criteria extends Jsonable<Criteria>() {
	@Type(() => PriceRange)
	priceRange: PriceRange;

	@Type(() => Manufacturer)
	manufacturers: Manufacturer[];

	@Type(() => FilterSpecification)
	specifications: FilterSpecification[];
}

type PartSpecificationFilter = {
	specId: number,
	optionIds: number[]
}

export class PartCriteria {
	priceRange: Partial<PriceRange> = {};

	manufacturerSlugs: string[] = [];

	specifications: PartSpecificationFilter[] = [];
}

export interface HttpPriceRange {
	min: string;
	max: string;
}

export class PriceRange {
	@Transform(({value}) => +value)
	min: number;
	@Transform(({value}) => +value)
	max: number;

	currMax?: number;
	currMin?: number;
}

export class Manufacturer extends IFilterItem {
	name: string;
	slug: string;
}

