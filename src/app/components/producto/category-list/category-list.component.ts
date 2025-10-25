import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-categoria-lista',
  standalone: true,
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoriaListaComponent {
  @Input() categoriasList: ICategoria[] = [];
  @Output() callEditMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Output() callDeleteMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
}