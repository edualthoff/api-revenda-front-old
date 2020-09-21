import { Subscription } from 'rxjs';
import { Component, OnInit, EventEmitter, ViewChild, Input, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'eds-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit, OnDestroy{
  @ViewChild('overlayTemplate') content;
  //@ViewChild('domPortalContent', {static: true}) domPortalContent: ElementRef<HTMLElement>;
  //@ViewChild('hoursField', { static: true }) hoursField: ElementRef<MatInput>;
 // @ViewChild('minutesField') minutesField: ElementRef<MatInput>;

  @Output() selected: EventEmitter<TimeCustom> = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @Input() stepTime: number;
  @Input() timeFormat: '12hr' | '24hr';
  @Input() displayWith: ((value: any) => string) | null;
  
  timeCustom: TimeCustom = new TimeCustom();
  meridiemHidden: boolean;
  regex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
  private subscribe: Subscription;
  constructor() {}

  ngOnInit(): void {
    //this.TimeCustom2 = this.selected.observers
    this.timeCustom.hours = 0;
    this.timeCustom.minutes = 0;
    this.stepTime = this.stepTime < 59 ? this.stepTime : 1;
    this.timeCustom.meridiem = this.timeFormat === '24hr' ? '' : 'AM';
    this.meridiemHidden = this.timeFormat === '24hr' ? true : false;
    this.onSetTime(this.timeCustom);

    //console.log("mm time ", this.timeCustom.hours)
    this.subscribe = this.selected.subscribe((x: TimeCustom) => {this.timeCustom = x; });
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
    this.selected.unsubscribe();
    this.cancel.unsubscribe();
  }

  incraseTime(type: string) {
    if (type === 'hours') {
      this.timeCustom.hours = this.validateHours(this.timeCustom.hours += 1);
    }
    else {
      if ((this.timeCustom.minutes + this.stepTime) < 60) {
        this.timeCustom.minutes += this.stepTime;
      } else if ((this.timeCustom.minutes + this.stepTime) === 60) {
        this.timeCustom.minutes = 0;
        this.timeCustom.hours = this.validateHours(this.timeCustom.hours += 1);
      } else {
        this.timeCustom.minutes += this.stepTime;
        this.timeCustom.hours = this.validateHours(this.timeCustom.hours += 1);
      }
    }
  }

  decreaseTime(type: string) {
    if (type === 'hours') {
      this.timeCustom.hours = this.validateHours(this.timeCustom.hours -= 1);
    }
    else {
      if ((this.timeCustom.minutes) >= this.stepTime) {
        this.timeCustom.minutes -= this.stepTime;
      } else if (Math.abs(this.timeCustom.minutes - this.stepTime) === 60 || Math.abs(this.timeCustom.minutes - this.stepTime) === 0) {
        this.timeCustom.minutes = 0;
      } else {
        this.timeCustom.minutes = Math.abs(this.timeCustom.minutes === 0 ? 60 - this.stepTime : this.timeCustom.minutes - this.stepTime);
        this.timeCustom.hours = this.validateHours(this.timeCustom.hours -= 1);
      }
    }
  }

  private validateHours(hour: number): number {
    switch (this.meridiemHidden) {
      case true:
        if ( hour > 23) {
          return hour = 0;
        } else if (hour < 0) {
          return hour = 23;
        } else {
          return hour;
        }
      case false:
        if ( hour > 12) {
          return hour = 1;
        } else if (hour < 1) {
          return hour = 12;
        } else {
          return hour;
        }
    }
  }

  toggleAMPM(meridiemChange: string) {
    switch (meridiemChange) {
      case 'AM':
        this.timeCustom.meridiem = 'AM';
      break;
    case 'PM':
      this.timeCustom.meridiem = 'PM';
      break;
    }
  }

  onCancel() {
   this.cancel.emit(true);
  }

  onSetTime(timeCustom: TimeCustom) {
    /*if (typeof this.timeCustom === "object"){
      this.timeCustom.hours = this.hours;
      this.timeCustom.minutes = this.minutes;
      this.timeCustom.meridiem = this.meridiem;
      console.log("mm time 2", this.timeCustom.hours)
      console.log("mm time 2", timeCustom.hours);
    }*/
    this.selected.emit(timeCustom);
  }
}
export class TimeCustom {
  hours: number;
  minutes: number;
  meridiem: 'AM' | 'PM' | '';
}
