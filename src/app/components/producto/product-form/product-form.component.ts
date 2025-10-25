import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProducto, ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  @Input() form!: FormGroup;
  @Input() isEdit: boolean = false;
  @Input() categories: ICategoria[] = [];
  @Input() showCategorySelector: boolean = true;
  @Output() callSaveMethod: EventEmitter<IProducto> = new EventEmitter<IProducto>();
}