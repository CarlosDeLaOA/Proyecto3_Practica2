import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICategoria } from '../../../interfaces';

@Component({
  selector: 'app-categoria-lista-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-list-form.component.html',
  styleUrls: ['./category-list-form.component.scss'] 
})
export class CategoriaListaFormComponent {
  @Input() form!: FormGroup;
  @Output() callSaveMethod: EventEmitter<ICategoria> = new EventEmitter<ICategoria>();
}