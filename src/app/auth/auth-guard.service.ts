import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(public authService: AuthService) { }
  // Despues de cargar el modulo no permitir abrirlo
  canActivate() {
    return this.authService.isAuth();
  }
  // Para no cargar el modulo
  canLoad() {
    return this.authService.isAuth()
      .pipe(take(1)); // Escucha y cancela la subscripcion(cantidad de veces)
  }
}
