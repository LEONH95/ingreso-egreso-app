import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})


export class NavbarComponent implements OnInit, OnDestroy {
  nombreUsuario: string;
  subscription: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      ).subscribe(auth => this.nombreUsuario = auth.user.nombre);
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();

  }

}
