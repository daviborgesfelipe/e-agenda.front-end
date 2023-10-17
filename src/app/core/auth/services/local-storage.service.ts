import { Injectable } from "@angular/core";
import { TokenViewModel } from "../models/token.view-model";

@Injectable()
export class LocalStorageService {
  private chaveLocalStorage: string = 'e-agenda-dados'

  public salvarDadosLocaisUsuario(us: TokenViewModel){
    const jsonString = JSON.stringify(us)
    localStorage.setItem(this.chaveLocalStorage, jsonString)
  }
  public obterDadosLocaisSalvos(): TokenViewModel | undefined {
    const jsonString = localStorage.getItem(this.chaveLocalStorage);

    if (!jsonString) return undefined;

    return JSON.parse(jsonString) as TokenViewModel;
  }
}