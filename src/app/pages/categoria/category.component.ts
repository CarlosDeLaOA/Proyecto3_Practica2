import { Component, OnInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { ICategory } from '../../interfaces';
import { CategoriaListaFormComponent } from '../../components/producto/category-list-form/category-list-form.component';
import { CategoriaListaComponent } from '../../components/producto/category-list/category-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    CommonModule,
    CategoriaListaFormComponent,
    CategoriaListaComponent,
    PaginationComponent,
    LoaderComponent
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categoriaService = inject(CategoriaService);
  public fb = inject(FormBuilder);

  public isEdit = false;

  public form = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor() {
    effect(() =>
      console.log('Categories Updated:', this.categoriaService.categorias$())
    );
  }

  ngOnInit(): void {
    this.categoriaService.obtenerTodos();
  }

  guardar(categoria: ICategory) {
    if (this.isEdit && categoria.id) {
      this.categoriaService.actualizar(categoria);
    } else {
      this.categoriaService.guardar(categoria);
    }

    this.form.reset();
    this.isEdit = false;
  }

  editar(categoria: ICategory) {
    this.isEdit = true;
    this.form.patchValue({
      id: categoria.id,
      name: categoria.name,
      description: categoria.description
    });
  }

  eliminar(categoria: ICategory) {
    this.categoriaService.eliminar(categoria);
  }
}