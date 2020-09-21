import { MarcasModal } from './../services/marcas.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OnInit, Inject, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulario-dialog',
  templateUrl: './formulario-dialog.component.html',
  styleUrls: ['./formulario-dialog.component.scss']
})

export class FormularioDialogComponent implements OnInit {

  public marcasForm: FormGroup;

  constructor(
    private formaBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormularioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public marcasModel: MarcasModal) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.marcasForm = this.formaBuilder.group({
      idMarcas: new FormControl({value: this.marcasModel.id, disabled: true}),
      nome: new FormControl({ value: this.marcasModel.nome, disabled: this.marcasModel.id !== undefined }, Validators.required),
    });
  }

  submitForm(){
    this.marcasModel.id = this.marcasForm.controls.idMarcas.value;
    this.marcasModel.nome = this.marcasForm.controls.nome.value;
    this.dialogRef.close(this.marcasModel);
  }
  /*onNoClick(): void {
    this.dialogRef.close();
  }*/
}
