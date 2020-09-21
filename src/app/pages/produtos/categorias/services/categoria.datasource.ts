import { CategoriasService } from './categorias.service';
import { CategoriasComponent } from './../categorias.component';
import { catchError, finalize } from 'rxjs/operators';
import { HttpCategoriasService } from './http-categorias.service';
import { CategoriasModal, CategoriasListResponse } from './categorias.modal';
import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';


export class CategoriaDataSource implements DataSource<CategoriasModal> {
  connect(collectionViewer: CollectionViewer): Observable<CategoriasModal[] | readonly CategoriasModal[]> {
    throw new Error("Method not implemented.");
  }
  disconnect(collectionViewer: CollectionViewer): void {
    throw new Error("Method not implemented.");
  }

  /*private todoSubject = new BehaviorSubject<Categorias[]>([]);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private categoriasService: CategoriasService) { }

  connect(collectionViewer: CollectionViewer): Observable<Categorias[] | readonly Categorias[]> {
    return this.todoSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.todoSubject.complete();
    this.countSubject.complete();
  }
  loadTodos(pageNumber = 0, pageSize = 10) {
    this.categoriasService.loadTodosAllPage2( pageNumber, pageSize )
      .pipe(
        catchError(() => of([])),
      )
      .subscribe((result: CategoriasListResponse) => {
        console.log("nome: {} {} {}",result.content[1].id, result.content[1].nome, result.content[1].status)
        this.todoSubject.next(result.content);
        this.countSubject.next(result.totalElements);
      });
  }*/
}
