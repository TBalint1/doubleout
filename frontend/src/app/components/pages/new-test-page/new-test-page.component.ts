import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { ITest } from 'src/app/shared/interfaces/ITest';

@Component({
  selector: 'app-new-test-page',
  templateUrl: './new-test-page.component.html',
  styleUrls: ['./new-test-page.component.css']
})
export class NewTestPageComponent implements OnInit{

  form!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 

  }
  ngOnInit(): void {
    
    this.form = this.fb.group({
    type: ['',Validators.required],
    count: ['',Validators.required],
    question: ['',Validators.required],
    answer: ['',Validators.required],
    bot:this.fb.array([])
  });   
  }

  get bot() {
    return this.form.get('bot') as FormArray;
  }

  get fc() {
    return this.form.controls;
  }

  addBot() {
    const bot = this.fb.group({
      name: ['',Validators.required],
      answer: ['',Validators.required]
    });
    this.bot.push(bot);
  }

  removeBot( index: number) {
    this.bot.removeAt(index);
  }

  submit() {

    const test: ITest = {
      type: this.form.value.type,
      count: parseInt(this.form.value.count),
      question: this.form.value.question,
      answer: this.form.value.answer,
      bot: this.form.value.bot
    };

    this.testService.newTest(test).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })

    // if (this.form.valid) {
    //   this.testService.newTest(test).subscribe(_ => {
    //     console.log('Az adatok sikeresen elküldve az adatbázis számára');
    //     this.router.navigateByUrl(this.returnUrl);
    //   }, error => {
    //     console.error('Hiba történt az adatok küldése közben:', error);
    //     // Hiba kezelése
    //   });
    // } else {
    //   console.log('Az űrlap érvénytelen');
    // }
  }

}
