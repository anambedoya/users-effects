import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usuariosActions from "../actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";

// Actions es un observable que escucha las acciones

@Injectable()
export class UsuariosEffects {
    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            mergeMap(
                () => this.usuarioService.getUsers()
                    .pipe(
                        map(users => usuariosActions.cargarUsuariosSuccess({usuarios: users})),
                        catchError(err => of(usuariosActions.cargarUsuariosError({ payload: err})))
                    )
            )
        )
    );
}