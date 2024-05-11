import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent implements OnInit {
  @Input() control!: AbstractControl;
  @Input() showErrorsWhen: boolean = true;
  @Input() label!: string;
  @Input() options: any[] = [];
  @Input() type: 'text' | 'number' = 'text' ;

  get formControl(){
    return this.control as FormControl;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
