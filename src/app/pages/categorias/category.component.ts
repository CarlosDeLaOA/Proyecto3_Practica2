import { Component, OnInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/categoryservices';
import { ICategoria } from '../../interfaces';
import { CategoryFormComponent } from '../../components/producto/category-form/category-list-form.component';
import { CategoryListComponent } from '../../components/producto/category-list/category-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    CategoryFormComponent,
    CategoryListComponent,
    PaginationComponent,
    LoaderComponent
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categoryService = inject(CategoryService);
  public fb = inject(FormBuilder);

  public isEdit = false;

  public form = this.fb.group({
    id: [0],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  constructor() {
    // efecto para ver cambios en las categorías (solo debug)
    effect(() => console.log('categorías actualizadas', this.categoryService.categories$()));
  }

  ngOnInit(): void {
    this.categoryService.getAll();
  }

  save(category: ICategoria) {
    if (this.isEdit && category.id) {
      this.categoryService.update(category);
    } else {
      this.categoryService.save(category);
    }

    this.form.reset();
    this.isEdit = false;
  }

  edit(category: ICategoria) {
    this.isEdit = true;
    this.form.patchValue(category);
  }

  delete(category: ICategoria) {
    this.categoryService.delete(category);
  }
}