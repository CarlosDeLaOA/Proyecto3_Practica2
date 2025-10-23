import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IGift, ICategories, IProduct } from '../../../interfaces';

@Component({
  selector: 'app-gift-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './gift-form.component.html',
  styleUrl: './gift-form.component.scss'
})
export class GiftFormComponent {
  @Input() form!: FormGroup;
  @Input() isEdit: boolean = false;
  @Input() giftLists: ICategories[] = [];
  @Input() showGiftListSelector: boolean = true;
  @Output() callSaveMethod: EventEmitter<IGift> = new EventEmitter<IProduct>();
}