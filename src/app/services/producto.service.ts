import { inject, Injectable, signal } from '@angular/core';
import { IProduct, IResponse, ISearch } from '../interfaces';
import { BaseService } from './base-service';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class ProductoService extends BaseService<IProduct> {
  protected override source = 'products';
  private productoSignal = signal<IProduct[]>([]);

  get productos$() {
    return this.productoSignal;
  }

  public busqueda: ISearch = { page: 1, size: 10 };
  public totalElementos: number[] = [];
  private alertaService = inject(AlertService);

  obtenerTodos() {
    this.findAllWithParams({ page: this.busqueda.page, size: this.busqueda.size }).subscribe({
      next: (resp: IResponse<IProduct[]>) => {
        this.busqueda = { ...this.busqueda, ...resp.meta };
        this.totalElementos = Array.from(
          { length: this.busqueda.totalPages ?? 0 },
          (_, i) => i + 1
        );
        this.productoSignal.set(resp.data);
      },
      error: (err: any) => console.error('Error', err),
    });
  }

  obtenerPorCategoriaId(categoriaId: number) {
    this.findAllWithParamsAndCustomSource(
      `category/${categoriaId}`,
      { page: this.busqueda.page, size: this.busqueda.size }
    ).subscribe({
      next: (resp: IResponse<IProduct[]>) => {
        this.busqueda = { ...this.busqueda, ...resp.meta };
        this.totalElementos = Array.from(
          { length: this.busqueda.totalPages ?? 0 },
          (_, i) => i + 1
        );
        this.productoSignal.set(resp.data);
      },
      error: (err: any) => console.error('Error', err),
    });
  }

  agregarProductoACategoria(categoriaId: number, producto: IProduct) {
    this.addCustomSource(
      `category/${categoriaId}`,
      producto
    ).subscribe({
      next: (resp: IResponse<IProduct>) => {
        this.alertaService.displayAlert('success', resp.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: (err: any) => {
        this.alertaService.displayAlert('error', 'Error', 'center', 'top', ['error-snackbar']);
        console.error('Error', err);
      },
    });
  }

  actualizar(producto: IProduct) {
    this.edit(producto.id!, producto).subscribe({
      next: (resp: IResponse<IProduct>) => {
        this.alertaService.displayAlert('success', resp.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: (err: any) => {
        this.alertaService.displayAlert('error', 'Error', 'center', 'top', ['error-snackbar']);
        console.error('Error', err);
      },
    });
  }

  eliminar(producto: IProduct) {
    this.del(producto.id!).subscribe({
      next: (resp: IResponse<IProduct>) => {
        this.alertaService.displayAlert('success', resp.message, 'center', 'top', ['success-snackbar']);
        this.obtenerTodos();
      },
      error: (err: any) => {
        this.alertaService.displayAlert('error', 'Error', 'center', 'top', ['error-snackbar']);
        console.error('Error', err);
      },
    });
  }
 
  eliminarProductoDeCategoria(categoriaId: number, productoId: number) {
    this.delCustomSource(
      `category/${categoriaId}/${productoId}`
    ).subscribe({
      next: (resp: IResponse<IProduct>) => {
        this.alertaService.displayAlert('success', resp.message, 'center', 'top', ['success-snackbar']);
        this.obtenerPorCategoriaId(categoriaId);
      },
      error: (err: any) => {
        this.alertaService.displayAlert('error', 'Error', 'center', 'top', ['error-snackbar']);
        console.error('Error', err);
      },
    });
  }
}
