import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProduct, ICategory } from '../../../interfaces';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
})
export class ProductoFormComponent {
  @Input() form!: FormGroup;
  @Input() isEdit: boolean = false;
  @Input() categorias: ICategory[] = [];
  @Input() showCategorySelector: boolean = true;
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
}