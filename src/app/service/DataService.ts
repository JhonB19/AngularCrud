import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUpdatedSource = new Subject<void>();

  dataUpdated$ = this.dataUpdatedSource.asObservable();

  announceDataUpdated(): void {
    this.dataUpdatedSource.next();
  }
}
