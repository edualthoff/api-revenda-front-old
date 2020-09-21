import { TimePickerComponent, TimeCustom } from './../../../../shared/components/time-picker/time-picker.component';
import { MatDialog } from '@angular/material/dialog';
import { URL_HTTPS_PATTERN } from './../../../../shared/util/pattern.regex';
import { LinksModal } from './../services/links.modal';
import { ItensProduto, ItensListResponse, ItensModal } from './../../../produtos/itens/services/itens.modal';
import { HttpItensService } from './../../../produtos/itens/services/http-itens.service';
import { HttpMlLinksService } from './../services/http-ml-links.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { startWith, map, debounceTime, switchMap, tap, finalize } from 'rxjs/operators';
import { validateInstanceValueError } from './../../../../shared/functions/formcontrol.functions';

@Component({
  templateUrl: './links-formulario.component.html',
  styleUrls: ['./links-formulario.component.scss']
})

export class LinksFormularioComponent implements OnInit, OnDestroy {

  public titulo: string = 'Adicionar';
  public linksForm: FormGroup;

  /** Loding spinner */
  private readonly loading = new Subject<boolean>();
  public loading$: Observable<boolean> = this.loading;
  /** AutoComplete */
  filteredOptions: Observable<ItensModal[]>;
  public pagItens = 0;
  public totalPagItens = 1;

  constructor(private _formaBuilder: FormBuilder, private _http: HttpMlLinksService, private _httpItens: HttpItensService,
    private _router: Router, private _activedRoute: ActivatedRoute, private dialog: MatDialog) { }


    ngOnInit(): void {
    this.createForm();
    const timeCustom: TimeCustom = {hours: 1, minutes: 20, meridiem: ''};
    this.linksForm.get('timeCustom').setValue(timeCustom);

    if (this._activedRoute.snapshot.params['id'] !== undefined) {
      this.titulo = 'Atualizar';
      this._http.get(this._activedRoute.snapshot.params['id']).pipe(debounceTime(200)).subscribe(result => {
        this.linksForm.patchValue({
          idLink: result.id,
          linkUrl: result.linkUrl,
          descricao: result.descricao,
          rangeInicial: result.rangeInicial,
          rangeFinal: result.rangeFinal,
          condicao: result.condicao,
          status: result.status,
          idProduto: this.getItemIdProduto(result.idProduto),
          timeCustom: result.schedulingTime
        });
      });
    }

    this.filteredOptions = this.linksForm.controls['idProduto'].valueChanges
      .pipe(
        startWith(''),
        debounceTime(200),
        tap(() => this.loading.next(true)),
        switchMap(value => {
          if (value !== '' && value.length > 2) {
            // lookup from github
            return this._filterAutoComplete(value).pipe(finalize(() => { this.loading.next(false); }));
          } else {
            // if no value is pressent, return null
            return of(null);
          }
        }),
      );
  }

  ngOnDestroy(): void {
    this.loading.unsubscribe();
  }

  private getItemIdProduto(idProduto: string) {
    this._httpItens.get(idProduto).subscribe((x) => {
      this.linksForm.get(['idProduto']).setValue(new ItensProduto(x.id, x.modelo, x.descricao, x.idCategoria, x.idMarca));
      //return new ItensProduto(x.id, x.modelo, x.descricao, x.idCategoria, x.idMarca);
    });
  }
  /** Valor mostrado no input do AutoComplete */
  private displayFn(iten?: ItensProduto): string | undefined {
    return iten ? iten.modelo : undefined;
  }
  /** Valor mostrado no input do Scheduling time */
  private displayFnTime(timeCustom?: TimeCustom): string | undefined {
    return timeCustom ? timeCustom.hours+":"+timeCustom.minutes+" "+timeCustom.meridiem : undefined;
  }
  private _filterAutoComplete(value: string): Observable<ItensModal[]> {
    return this._httpItens.getTodosPagePorModelo(this.pagItens, 10, value).pipe(
      // Set loading to true when request begins
      debounceTime(20),
      map((result: ItensListResponse) => {
        return result.content.map((x) => {
          const itens = new ItensProduto(x.id, x.modelo, x.descricao, x.idCategoria, x.idMarca);
          itens.getCategorias().subscribe();
          //console.log("log 2: ", itens.id, " ", itens.categoriasModal.nome);

          return itens;
        });
      },
        (err) => {
          console.log(err);
          this.loading.next(false);
          return of([{ login: "Error no servidor" }]);
        }
      ));
  }

  /** Cria o formulario */
  private createForm(): void {
    this.linksForm = this._formaBuilder.group({
      idLink: new FormControl({ value: '', disabled: true }),
      linkUrl: new FormControl('', [Validators.required, Validators.pattern(URL_HTTPS_PATTERN)]),
      descricao: new FormControl(''),
      condicao: new FormControl('', Validators.required),
      rangeInicial: new FormControl('', Validators.required),
      rangeFinal: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      idProduto: new FormControl('', [Validators.required, validateInstanceValueError(ItensProduto)]),
      timeCustom: new FormControl('', Validators.required),
    });
  }


  buttonSalvar() {
    const linksModal: LinksModal = {} as LinksModal;
    linksModal.id = this.linksForm.get(['idLink']).value;
    linksModal.linkUrl = this.linksForm.get(['linkUrl']).value;
    linksModal.descricao = this.linksForm.get(['descricao']).value;
    linksModal.condicao = this.linksForm.get(['condicao']).value;
    linksModal.rangeInicial = this.linksForm.get(['rangeInicial']).value;
    linksModal.rangeFinal = this.linksForm.get(['rangeFinal']).value;
    linksModal.status = this.linksForm.get(['status']).value;
    linksModal.idProduto = this.linksForm.get(['idProduto']).value.id;
    linksModal.schedulingTime = this.linksForm.get(['timeCustom']).value;


    if (this._activedRoute.snapshot.params['id'] !== undefined) {
      this.alterarObject(linksModal);
    } else {
      this.adicionarObject(linksModal);
    }
  }

  private adicionarObject(linksModal: LinksModal) {
    this._http.post(linksModal).subscribe(
      () => { },
      () => { },
      () => { this._router.navigate([`../`], { relativeTo: this._activedRoute }); });
  }

  private alterarObject(linksModal: LinksModal) {
    this._http.put(this._activedRoute.snapshot.params['id'], linksModal).subscribe(
      () => { },
      () => { },
      () => { this._router.navigate([`../../`], { relativeTo: this._activedRoute }); });
  }

  buttonSair() {
    this._router.navigate([`mercado-livre/links-buscas`]);
  }

}
