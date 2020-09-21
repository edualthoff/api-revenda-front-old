import { Router } from '@angular/router';
import { HttpItensService } from './../services/http-itens.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { filter, tap } from 'rxjs/operators';
import { ConfirmDialogModel } from './../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ItensModal, ItensListResponse, ItensProduto } from './../services/itens.modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-itens-list',
  templateUrl: './itens-list.component.html',
  styleUrls: ['./itens-list.component.scss']
})
export class ItensListComponent implements OnInit {

  constructor(public dialog: MatDialog, private http: HttpItensService, private router: Router ) { }

  @ViewChild('table') table: MatTable<ItensProduto>;
  displayedColumns: string[] = ['id', 'modelo', 'descricao', 'idCategoria', 'idMarca', 'editar'];
  public dataSource = new MatTableDataSource<ItensProduto>();
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
    this.http.getTodosPage(index, size).subscribe((res: ItensListResponse) => {
      const itens = new Array<ItensProduto>();
      res.content.forEach(x => {
        const itenFor = new ItensProduto( x.id, x.modelo, x.descricao, x.idCategoria, x.idMarca );
        itenFor.getMarcas();
        itenFor.getCategorias();
        itens.push(itenFor);
        //console.log("teste 2", itenFor.marcasModal.nome, " ", itenFor.categoriasModal.nome);
      });

      this.paginator.length = res.totalElements;
      this.dataSource.data = itens;
      this.table.renderRows();
    });
  }

  buttonAdicionar() {
    this.router.navigateByUrl(`${this.router.url}/adicionar`);
  }

  buttonEditar(itensModal: ItensModal) {
    this.router.navigateByUrl(`${this.router.url}/atualizar/${itensModal.id}`);

  }


  buttonExlcuir(idItens: string) {
    this.dialog.ngOnDestroy();
    const message = `Gostaria de excluir o Iten?`;
    const dialogData = new ConfirmDialogModel(this.dialog, "Excluir Itens", message);
    dialogData.montDialog().pipe(filter(x => x === true)).subscribe((x) => {
      this.http.delete(idItens).subscribe(
        () => { },
        () => { },
        () => { this.loadTodosPage(); });
    });
  }
}
