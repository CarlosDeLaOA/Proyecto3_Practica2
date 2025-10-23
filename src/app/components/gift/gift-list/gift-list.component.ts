import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategories, IGiftList } from '../../../interfaces';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  imports: [],
  templateUrl: './gift-list.component.html',
  styleUrl: './gift-list.component.scss'
})
export class GiftListComponent {
  @Input() giftsList: ICategories[] = [];
  @Output() callEditMethod: EventEmitter<ICategories> = new EventEmitter<ICategories>();
  @Output() callDeleteMethod: EventEmitter<ICategories> = new EventEmitter<ICategories>();
}
