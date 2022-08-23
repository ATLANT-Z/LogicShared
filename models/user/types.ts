export class PersonNames {
	firstName: string;
	middleName: string;
	lastName: string;

	get FullName() {
		return `${this.lastName || ''} ${this.firstName || ''} ${this.middleName || ''}`.trim();
	}
}
