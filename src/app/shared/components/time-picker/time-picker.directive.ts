import { TimePickerComponent } from './time-picker.component';
import { Directive, Renderer2, Input, ElementRef, HostListener, AfterViewInit, Optional } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[edsTimePicker]'
})

export class TimePickerDirective implements AfterViewInit {

  @Input("edsTimePicker") target: TimePickerComponent;
  //@Input("formControl") formControl: FormControl;
  //@Input("displayWith") displayWith: ((value: any) => string) | null;

  private overlayRef: OverlayRef;

  constructor(private renderer: Renderer2, private elem: ElementRef, private overlay: Overlay, @Optional() private ngModel: NgControl) { }

  ngAfterViewInit(): void {
    if (this.ngModel !== null) {
      this.changeInputValue(this.ngModel.control.value);
      this.target.onSetTime(this.ngModel.control.value);
    }
  }

  @HostListener('click', ['$event'])
  @HostListener('touch', ['$event'])
  overlayTemplateAngularMaterial() {
    /** Cria um overlayTemplate do angular material CDK, vincula ao elementeReff informado, que seria um INPUT*/
    console.log(this.elem);
    const overlayPositioner = this.overlay.position();
    const positionStrategy = overlayPositioner
    .flexibleConnectedTo(this.elem)
    .withPositions([
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 7
      }
    ]);
    const overlayConfig = new OverlayConfig({
      positionStrategy,
      height: 'auto',
      width: '0%',
      disposeOnNavigation: false,
    });
    overlayConfig.hasBackdrop = true;
    this.overlayRef = this.overlay.create(overlayConfig);

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeDisplay();
    });
    this.overlayRef.attach((this.target.content));

    this.target.cancel.subscribe(() => {
      this.closeDisplay();
    });
    this.target.selected.subscribe((dateTime) => {
      if (this.ngModel !== null) {
        this.ngModel.control.setValue(dateTime);
      }
      this.changeInputValue(dateTime);
      this.closeDisplay();
    });

  }
  /*
  @HostListener("edsTimePicker", ["$event"])
  onNgModelChange(value) {
    console.log("ngModelChange", value);
    this.changeInputValue(value);
    //this.elem.nativeElement.value = this.target.displayWith !== undefined ? this.target.displayWith(value) : value;
  }*/

  private changeInputValue(dateTime){
    const value = this.target.displayWith !== undefined ? this.target.displayWith(dateTime) : dateTime;
    this.renderer.setProperty(this.elem.nativeElement, 'value', value );
    //(this.elem.nativeElement as HTMLInputElement).value = this.target.displayWith !== undefined ? this.target.displayWith(dateTime) : dateTime;
  }

  private closeDisplay() {
    this.overlayRef.dispose();
  }
}
