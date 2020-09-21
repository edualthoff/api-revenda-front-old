import { CategoriasModal } from './../services/categorias.modal';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-formulario-dialog',
  templateUrl: './formulario-dialog.component.html',
  styleUrls: ['./formulario-dialog.component.scss']
})

export class FormularioDialogComponent implements OnInit, OnDestroy {

  public categoriaForm: FormGroup;
  public statusBase: boolean = null;

  constructor(
    private formaBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormularioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public categoria: CategoriasModal) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.categoriaForm = this.formaBuilder.group({
      idCat: new FormControl({value: this.categoria.id, disabled: true}),
      nome: new FormControl({ value: this.categoria.nome, disabled: this.categoria.id !== undefined }, Validators.required),
      status: new FormControl(this.categoria.status, Validators.required)
    });
    this.statusBase = this.categoria.status;
  }

  submitForm(){
    this.categoria.id = this.categoriaForm.controls.idCat.value;
    this.categoria.nome = this.categoriaForm.controls.nome.value;
    this.categoria.status = this.categoriaForm.controls.status.value;
    this.dialogRef.close(this.categoria);
  }
  /*onNoClick(): void {
    this.dialogRef.close();
  }*/
}
