
import { inject, Injectable, signal } from '@angular/core';
import { IProducto, IResponse, ISearch } from '../interfaces';
import { BaseService } from './base-service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProducto> {
  protected override source: string = 'products';
  private productSignal = signal<IProducto[]>([]);
  
  get products$() {
    return this.productSignal;
  }

  public search: ISearch = { 
    page: 1,
    size: 10
  };
  
  public totalItems: any = [];
  private alertService: AlertService = inject(AlertService);

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size}).subscribe({
      next: (response: IResponse<IProducto[]>) => {
        this.search = {...this.search, ...response.meta};
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
        this.productSignal.set(response.data);
      },
      error: (err: any) => console.error('error', err)
    });
  }

  getProductsByCategoryId(categoryId: number) {
    this.findAllWithParamsAndCustomSource(`category/${categoryId}`, { page: this.search.page, size: this.search.size }).subscribe({
      next: (response: IResponse<IProducto[]>) => {
        this.search = {...this.search, ...response.meta};
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
        this.productSignal.set(response.data);
      },
      error: (err: any) => console.error('error', err)
    });
  }

  addProductToCategory(categoryId: number, product: IProducto) {
    this.addCustomSource(`category/${categoryId}`, product).subscribe({
      next: (response: IResponse<IProducto>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Error adding product', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(item: IProducto) {
    this.edit(item.id!, item).subscribe({
      next: (response: IResponse<IProducto>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Error updating product','center','top',['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(item: IProducto) {
    this.del(item.id!).subscribe({
      next: (response: IResponse<IProducto>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Error deleting product','center','top',['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  deleteProductFromCategory(categoryId: number, productId: number) {
    this.delCustomSource(`../categories/${categoryId}/products/${productId}`).subscribe({
      next: (response: IResponse<IProducto>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getProductsByCategoryId(categoryId);
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'Error deleting product','center','top',['error-snackbar']);
        console.error('error', err);
      }
    });
  }
}
