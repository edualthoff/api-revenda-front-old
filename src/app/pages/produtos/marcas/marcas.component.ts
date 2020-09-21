import { ConfirmDialogModel } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MarcasModal, MarcasListResponse } from './services/marcas.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpMarcasService } from './services/http-marcas.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { tap, filter } from 'rxjs/operators';
import { FormularioDialogComponent } from './formulario-dialog/formulario-dialog.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  constructor(public dialog: MatDialog, private http: HttpMarcasService) { }

  @ViewChild('table') table: MatTable<MarcasModal>;
  displayedColumns: string[] = ['id', 'nome', 'editar'];
  public dataSource = new MatTableDataSource<MarcasModal>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.loadTodosPage(0, 10);

    this.loadPaginator();
  }
  loadPaginator() {
    this.subscription.add(this.paginator.page
      .pipe(
        tap(() => this.loadTodosPage(this.paginator.pageIndex, this.paginator.pageSize))
      ).subscribe());
  }

  loadTodosPage(index: number = this.paginator.pageIndex, size: number = this.paginator.pageSize) {
    this.subscription.add(this.http.getTodosPage(index, size).subscribe((res: MarcasListResponse) => {
      this.paginator.length = res.totalElements;
      this.dataSource.data = res.content;
      this.table.renderRows();
    }));
  }

  buttonAdicionar() {
    this.dialog.ngOnDestroy();
    const marcaModel = {} as MarcasModal;
    this.subscription.add(this.openDialog(marcaModel).pipe(filter(result => result !== false))
      .subscribe((result: MarcasModal) => {
        this.http.post(result).subscribe(
          () => { },
          () => { },
          () => { this.loadTodosPage(); });
      }));

  }

  buttonEditar(marcaModel: MarcasModal) {
    this.dialog.ngOnDestroy();
    this.subscription.add(this.openDialog(marcaModel).pipe(filter(result => result !== false))
      .subscribe((result: MarcasModal) => {
        this.http.put(result.id, result).subscribe(
          () => { },
          () => { },
          () => { this.loadTodosPage(); });
      }));
  }


  buttonExlcuir(idCategoria: string) {
    this.dialog.ngOnDestroy();
    const message = `Gostaria de excluir a categoia?`;
    const dialogData = new ConfirmDialogModel(this.dialog, "Excluir Marcas", message);
    this.subscription.add(dialogData.montDialog().pipe(filter(x => x === true)).subscribe((x) => {
      this.http.delete(idCategoria).subscribe(
        () => { },
        () => { },
        () => { this.loadTodosPage(); });
    }));
  }

  /**
   * Criar um Component Dialog qual manipula as informaçoes da categoria
   *
   * @private
   * @param {Categorias} categoria
   * @returns {Observable<any>}
   * @memberof CategoriasComponent
   */
  private openDialog(marcaModel: MarcasModal): Observable<any> {
    this.dialog.closeAll();
    return this.dialog.open(FormularioDialogComponent, {
      width: '350px',
      //height: '250px',
      hasBackdrop: false,
      data: marcaModel
    }).afterClosed();
  }

}
