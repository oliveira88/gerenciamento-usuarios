import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private stateSource = new BehaviorSubject<any>({});
  formState$ = this.stateSource.asObservable();

  atualizarFormState(state: any) {
    this.stateSource.next(state);
  }
}
