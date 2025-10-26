import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../interfaces';

@Component({
  selector: 'app-productos-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-table.html',

})
export class ProductosTablaComponent {
  @Input() productos: IProduct[] = [];
  @Input() areActionsAvailable: boolean = true;

  @Output() callEditMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
}