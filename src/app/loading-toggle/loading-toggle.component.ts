import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreDTO } from '../models/Store';
import { selectLoading } from '../store';

@Component({
  selector: 'app-loading-toggle',
  templateUrl: './loading-toggle.component.html',
  standalone: true,
  imports: [MatProgressSpinnerModule, AsyncPipe,NgIf],
  styleUrls: ['./loading-toggle.component.css']
})
export class LoadingToggleComponent {

  isLoading$: Observable<boolean>;

  constructor(private readonly store: Store<StoreDTO>) {
    this.isLoading$ = store.select(selectLoading);
  }

}
