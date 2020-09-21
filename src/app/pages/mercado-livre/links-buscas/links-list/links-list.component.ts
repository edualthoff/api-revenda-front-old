import { LinksModal, LinksMlListResponse } from './../services/links.modal';
import { HttpMlLinksService } from './../services/http-ml-links.service';
import { Router } from '@angular/router';
import { ConfirmDialogModel } from './../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.scss']
})
export class LinksListComponent implements OnInit {

  @ViewChild('table') table: MatTable<LinksModal>;
  displayedColumns: string[] = ['id', 'linkUrl', 'descricao', 'condicao', 'rangeInicial', 'rangeFinal','intervalo', 'status', 'editar'];

  public dataSource = new MatTableDataSource<LinksModal>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private router: Router, private http: HttpMlLinksService)  { }

  ngOnInit(): void {
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
    this.http.getTodosPage(index, size).subscribe((res: LinksMlListResponse) => {
      this.paginator.length = res.totalPages;
      this.dataSource.data = res.content;
      this.table.renderRows();
    });
  }

  buttonAdicionar() {
    this.router.navigateByUrl(`${this.router.url}/adicionar`);
  }

  buttonEditar(itensModal: LinksModal) {
    this.router.navigateByUrl(`${this.router.url}/atualizar/${itensModal.id}`);

  }


  buttonExlcuir(idItens: string) {
    this.dialog.ngOnDestroy();
    const message = `Gostaria de excluir o link?`;
    const dialogData = new ConfirmDialogModel(this.dialog, 'Excluir link', message);
    dialogData.montDialog().pipe(filter(x => x === true)).subscribe((x) => {
      this.http.delete(idItens).subscribe(
        () => { },
        () => { },
        () => { this.loadTodosPage(); });
    });
  }

}
