import { filter, tap } from 'rxjs/operators';
import { ConfirmDialogModel } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ItensModal, ItensListResponse } from './services/itens.modal';
import { MatPaginator } from '@angular/material/paginator';
import { HttpItensService } from './services/http-itens.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-itens',
  //templateUrl: './itens.component.html',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./itens.component.scss']
})
export class ItensComponent implements OnInit {

  constructor( private http: HttpItensService) { }

  ngOnInit(): void {
  }
}
