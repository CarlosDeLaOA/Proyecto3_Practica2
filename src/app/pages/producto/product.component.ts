import { Component, effect, inject } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductsTableComponent } from '../../components/producto/product-table/products-table.component';
import { ProductFormComponent } from '../../components/producto/product-form/product-form.component';
import { ProductService } from '../../services/productservices';
import { CategoryService } from '../../services/categoryservices';
import { FormBuilder, Validators } from '@angular/forms';
import { IProducto } from '../../interfaces';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    PaginationComponent,
    LoaderComponent,
    ProductsTableComponent,
    ProductFormComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  public productService = inject(ProductService);
  public categoryService = inject(CategoryService);
  public fb = inject(FormBuilder);

  public form = this.fb.group({
    id: [0],
    nombre: ['', Validators.required],
    descripcion: [''],
    precio: [0],
    stock: [0],
    categoryId: [null as number | null, Validators.required]
  });

  constructor() {
    this.productService.getAll();
    this.categoryService.getAll();

    effect(() => {
      console.log('Productos actualizados:', this.productService.products$());
    });
    effect(() => {
      console.log('Categorías cargadas:', this.categoryService.categories$());
    });
  }

  save(item: any) {
    const categoryId = item.categoryId;
    if (!categoryId) return;

    const payload: IProducto = {
      id: item.id ?? 0,
      name: item.nombre,
      description: item.descripcion,
      price: item.precio,
      stock: item.stock
    };

    if (item.id) {
      this.productService.update(payload);
    } else {
      this.productService.addProductToCategory(categoryId, payload);
    }

    this.form.reset();
  }

  editProduct(product: IProducto) {
    this.form.patchValue({
      id: product.id,
      nombre: product.name,
      descripcion: product.description,
      precio: product.price,
      stock: product.stock,
      categoryId: product.category?.id ?? null
    });
  }

  delete(item: IProducto) {
    this.productService.delete(item);
  }
}