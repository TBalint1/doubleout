import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, count } from 'rxjs';
import { TestService } from 'src/app/services/test.service';
import { ITest } from 'src/app/shared/interfaces/ITest';
import { Test } from 'src/app/shared/models/Test';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  tests: Test[] = [];

  constructor(private testService:TestService, activatedRoute:ActivatedRoute, private router:Router) { 
    let testObservable:Observable<Test[]>;
    activatedRoute.params.subscribe((params) => {
      testObservable = testService.getAll();

      testObservable.subscribe((serverTests) => {
        this.tests = serverTests;
      })
  }
  )}
  ngOnInit(): void {

  }
  
}



