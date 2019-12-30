import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label } from 'ng2-charts';
import { IngresoEgresoAppState } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;
  contadorIngresos: number;
  contadorEgresos: number;

  subsciption: Subscription;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<IngresoEgresoAppState>) { }

  ngOnInit() {

    this.subsciption = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        this.contarIngresoEgreso(ingresoEgreso.items);
      });

  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.contadorIngresos = 0;
    this.contadorEgresos = 0;

    items.forEach(item => {

      if (item.tipo === 'ingreso') {

        this.contadorIngresos++;
        this.ingresos += item.monto;

      }

      if (item.tipo === 'egreso') {

        this.contadorEgresos++;
        this.egresos += item.monto;

      }
    });

    this.doughnutChartData = [this.ingresos, this.egresos];
  }

}
