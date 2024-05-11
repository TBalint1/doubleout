import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Test } from '../shared/models/Test';
import { NEW_TEST_URL, TEST_BY_ID_URL, TEST_BY_SEARCH_URL, TEST_URL } from '../shared/constants/urls';
import { ITest } from '../shared/interfaces/ITest';

const TEST_KEY = 'Test'

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private testSubject = new BehaviorSubject<any>(this.getTestFromLocaleStorage());
  private testObservable:Observable<any>;

  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.testObservable=this.testSubject.asObservable();
   }

   getAll():Observable<Test[]>{
    return this.http.get<Test[]>(TEST_URL);
   }

   getAllTestBySearchTerm(searchTerm:string){
    return this.http.get<Test[]>(TEST_BY_SEARCH_URL + searchTerm)
   }

   newTest(testCreate: ITest):Observable<Test>{
    return this.http.post<Test>(NEW_TEST_URL, testCreate).pipe(tap
      ({
      next: (test) => {
        this.setTestToLocaleStorage(test);
        this.testSubject.next(test);
        this.toastrService.success(
          'Test created succesfully!'
        )
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Test Failed');
      }
    }));
   }

   getTestByID(testID:string):Observable<Test>{
    return this.http.get<Test>(TEST_BY_ID_URL + testID);
   }

   private setTestToLocaleStorage(test:Test){
    localStorage.setItem(TEST_KEY, JSON.stringify(test));
   }

   private getTestFromLocaleStorage(): Test{
    const testJson = localStorage.getItem(TEST_KEY);
    if(testJson) return JSON.parse(testJson) as Test;
    return new Test();
   }
}
