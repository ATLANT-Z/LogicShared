import * as validators from './validators'
import {BaseValidation, ValidationRule} from "@vuelidate/core";

export type MyValidatorsName = keyof typeof validators | string;
export type ClassValidation<Model> = Partial<Record<keyof Model, Record<MyValidatorsName, ValidationRule>>>;
export type MyVuelidateObj<T> = T & BaseValidation;
