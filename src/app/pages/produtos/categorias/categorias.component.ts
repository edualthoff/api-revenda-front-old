import { HttpCategoriasService } from './services/http-categorias.service';
import { filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoriasModal, CategoriasListResponse } from './services/categorias.modal';
import { ConfirmDialogModel } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FormularioDialogComponent } from './formulario-dialog/formulario-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  public categorias = {} as CategoriasModal;

  constructor(public dialog: MatDialog, private httpCategoria: HttpCategoriasService) {

  }

  @ViewChild('table') table: MatTable<CategoriasModal>;
  displayedColumns: string[] = ['id', 'nome', 'status', 'editar'];
  public dataSource = new MatTableDataSource<CategoriasModal>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.loadTodosPage(0, 10);

    this.loadPaginator();
  }
  loadPaginator() {
    this.paginator.page
      .pipe(
        tap(() => this.loadTodosPage(this.paginator.pageIndex, this.paginator.pageSize))
      )
      .subscribe();
  }

  loadTodosPage(index: number = this.paginator.pageIndex, size: number = this.paginator.pageSize) {
    console.log("texte ", index, " ", size)
    this.httpCategoria.getTodosPage(index, size).subscribe((res: CategoriasListResponse) => {
      this.paginator.length = res.totalElements;
      this.dataSource.data = res.content;
      this.table.renderRows();
    });
  }

  buttonAdicionar() {
    this.dialog.ngOnDestroy();
    const categorias = {} as CategoriasModal;
    this.openDialog(categorias).pipe(filter(result => result !== false))
      .subscribe((result: CategoriasModal) => {
        this.httpCategoria.post(result).subscribe(
          () => { },
          () => { },
          () => { this.loadTodosPage(); });
      });
  }

  buttonEditar(categorias: CategoriasModal) {
    this.dialog.ngOnDestroy();
    this.openDialog(categorias).pipe(filter(result => result !== false))
      .subscribe((result: CategoriasModal) => {
        console.log("editar: ", result.id)
        this.httpCategoria.put(result.id, result).subscribe(
          () => { },
          () => { },
          () => { this.loadTodosPage(); });
      });
  }


  buttonExlcuir(idCategoria: string) {
    this.dialog.ngOnDestroy();
    const message = `Gostaria de excluir a categoia?`;
    const dialogData = new ConfirmDialogModel(this.dialog, "Excluir Categoria", message);
    dialogData.montDialog().pipe(filter(x => x === true)).subscribe((x) => {
      this.httpCategoria.delete(idCategoria).subscribe(
        () => { },
        () => { },
        () => { this.loadTodosPage(); });
    });
  }

  /**
   * Criar um Component Dialog qual manipula as informaçoes da categoria
   *
   * @private
   * @param {CategoriasModal} categoria
   * @returns {Observable<any>}
   * @memberof CategoriasComponent
   */
  private openDialog(categoria: CategoriasModal): Observable<any> {
    this.dialog.closeAll();
    return this.dialog.open(FormularioDialogComponent, {
      width: '350px',
      hasBackdrop: false,
      data: categoria
    }).afterClosed();
  }

}
