import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';

  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor(private store: Store<AppState>, public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {

    this.loadingSubs = this.store.select('ui')
      .subscribe(ui => this.cargando = ui.isLoading);

    this.forma = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo });

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {
      this.forma.reset({
        monto: 0
      });
      this.store.dispatch(new DesactivarLoadingAction());
      alert('Creado ' + ingresoEgreso.descripcion + ' Con exito!');
    });


  }

}
