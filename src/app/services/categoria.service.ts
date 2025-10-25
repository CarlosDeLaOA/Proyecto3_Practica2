import { inject, Injectable, signal } from '@angular/core';
import { ICategory, IResponse, ISearch } from '../interfaces';
import { BaseService } from './base-service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService<ICategory> {
  protected override source: string = 'categories';
  private categoriaSignal = signal<ICategory[]>([]);

  get categorias$() {
    return this.categoriaSignal;
  }

  public busqueda: ISearch = { page: 1, size: 5 };
  public totalElementos: any = [];
  private alertaService: AlertService = inject(AlertService);

  obtenerTodos() {
    this.findAllWithParams({ page: this.busqueda.page, size: this.busqueda.size }).subscribe({
      next: (respuesta: IResponse<ICategory[]>) => {
        this.busqueda = { ...this.busqueda, ...respuesta.meta };
        this.totalElementos = Array.from(
          { length: this.busqueda.totalPages ?? 0 },
          (_, i) => i + 1
        );
        this.categoriaSignal.set(respuesta.data);
      },
      error: (err) => console.error('Error', err)
    });
  }

  guardar(categoria: ICategory) {
    this.add(categoria).subscribe({
      next: (respuesta: IResponse<ICategory>) => {
        this.alertaService.displayAlert('success', respuesta.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: () => {
        this.alertaService.displayAlert('error', 'Error', 'center', 'top', ['error-snackbar']);
      }
    });
  }

  actualizar(categoria: ICategory) {
    this.edit(categoria.id!, categoria).subscribe({
      next: (respuesta: IResponse<ICategory>) => {
        this.alertaService.displayAlert('success', respuesta.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: () => {
        this.alertaService.displayAlert('error', 'Error', 'center', 'top', ['error-snackbar']);
      }
    });
  }

  eliminar(categoria: ICategory) {
    this.del(categoria.id!).subscribe({
      next: (respuesta: IResponse<ICategory>) => {
        this.alertaService.displayAlert('success', respuesta.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: () => {
        this.alertaService.displayAlert('error', 'Error ', 'center', 'top', ['error-snackbar']);
      }
    });
  }
}