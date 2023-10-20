import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { LocalStorageService } from "../services/local-storage.service";

export const httpTokenInterceptor: HttpInterceptorFn = (
    requisicao: HttpRequest<unknown>, 
    next: HttpHandlerFn
  ) => {
    const token = inject(LocalStorageService).obterDadosLocaisSalvos()?.chave;
    const requestModificado = requisicao.clone({
      headers: requisicao.headers.set(`Authorization`, `Bearer ${token}`)
    })
    return next(requestModificado);
  }