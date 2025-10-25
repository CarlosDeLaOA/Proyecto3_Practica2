import { inject, Injectable, signal } from '@angular/core';
import { ICategoria, IResponse, ISearch } from '../interfaces';
import { BaseService } from './base-service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<ICategoria> {
  protected override source: string = 'categories';
  private categorySignal = signal<ICategoria[]>([]);
  get categories$() {
    return this.categorySignal;
  }

  public search: ISearch = { page: 1, size: 5 };
  public totalItems: any = [];
  private alertService: AlertService = inject(AlertService);

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response: IResponse<ICategoria[]>) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from(
          { length: this.search.totalPages ?? 0 },
          (_, i) => i + 1
        );
        this.categorySignal.set(response.data);
      },
      error: (err) => console.error('error', err)
    });
  }

  save(item: ICategoria) {
    this.add(item).subscribe({
      next: (response: IResponse<ICategoria>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: () => {
        this.alertService.displayAlert('error', 'Error adding category', 'center', 'top', ['error-snackbar']);
      }
    });
  }

  update(item: ICategoria) {
    this.edit(item.id!, item).subscribe({
      next: (response: IResponse<ICategoria>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: () => {
        this.alertService.displayAlert('error', 'Error updating category', 'center', 'top', ['error-snackbar']);
      }
    });
  }

  delete(item: ICategoria) {
    this.del(item.id!).subscribe({
      next: (response: IResponse<ICategoria>) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: () => {
        this.alertService.displayAlert('error', 'Error deleting category', 'center', 'top', ['error-snackbar']);
      }
    });
  }
}