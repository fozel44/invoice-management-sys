import { FormGroup } from '@angular/forms';
import { FormHandlerService } from '../service/form-handler.service';
import { OnInit } from '@angular/core';
import { BaseCrudOperationService } from './base-crud-operation.service';

export abstract class BaseCrudOperationComponent {

	
	
	entity: any;
	form: FormGroup;
	entityList
	constructor(protected baseCrudService: BaseCrudOperationService,protected formService: FormHandlerService) {
	}


	// addPrepare(baseModelUrl:string) {
	// 	this.baseCrudService.addPrepare(baseModelUrl).subscribe(
	// 		(res) => {
	// 			this.form = this.formService.entityToForm(res)
	// 		}
	// 	);
	// }

	editPrepare(baseModelUrl:string,id: string) {
		this.baseCrudService.editPrepare(baseModelUrl, id).subscribe(
			(res) => {
				this.form = this.formService.entityToForm(res)
			}
		);
	}

	add(baseModelUrl:string,dto: any) {
		this.baseCrudService.add(baseModelUrl, dto).subscribe(
			(res) => {
				return res
			}
		);
	}

	edit(baseModelUrl:string,dto: any) {
		this.baseCrudService.edit(baseModelUrl, dto).subscribe(
			(res) => {
				return res
			}
		);
	}

	view(baseModelUrl:string,id: string) {
		this.baseCrudService.view(baseModelUrl, id).subscribe(
			(res) => {
				this.entity = res;
			}
		);
	}

	

	activate(baseModelUrl:string,id: string) {
		this.baseCrudService.activate(baseModelUrl, id).subscribe(
			(res) => {
				return res
			}
		);
	}

	deactivate(baseModelUrl:string,id: string) {
		this.baseCrudService.deactivate(baseModelUrl, id).subscribe(
			(res) => {
				return res
			}
		);
	}

	trash(baseModelUrl:string,id: string) {
		this.baseCrudService.trash(baseModelUrl, id).subscribe(
			(res) => {
				return res
			}
		);
	}

	getAll(baseModelUrl:string) {
		this.baseCrudService.getAll(baseModelUrl).subscribe(
			(res) => {
				this.entityList = res
			}
		);
	}
}