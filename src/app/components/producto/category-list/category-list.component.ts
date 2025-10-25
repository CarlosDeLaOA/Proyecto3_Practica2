import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  @Input() categoriesList: ICategoria[] = [];
  @Output() callEditMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
  @Output() callDeleteMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
}