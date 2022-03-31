import {Injectable, Query} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchGifsResponse} from "../interface/gifs.interface";

@Injectable({
  /*Esto nos permite el servicio sea global*/
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[] = [];
  private _apiKey:string ='iSslZypiZDhBG6AcqSuuXLJQE5QRjYza';
  private _servicioURL = 'https://api.giphy.com/v1/gifs';
  public resultPeticion: Gif[] = [];

  constructor(
    private http:HttpClient

  ) {
    //Si el array del localStorage es null le asigna a this_historial un array vacío.
    this._historial = JSON.parse(localStorage.getItem('Historial')!) || [];
    this.resultPeticion = JSON.parse(localStorage.getItem('Gifs')!) || [];

  }

  get historial(){
    return [...this._historial];
  }

  borrarHistorial():void{
    this._historial = [];
    localStorage.removeItem('Historial');
    localStorage.removeItem('Gifs');
  }

  buscarGids(query:string){
    query=query.trim().toLocaleLowerCase();

    //Guardar un historial de las búsquedas realizadas y además almacenarlo en localStorage del navegador
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('Historial',JSON.stringify(this._historial));
    }

    //Todos los parámetros de la url de la API
    const params = new HttpParams()
      .set('api_key',this._apiKey)
      .set('q',query)
      .set('limit', '10');


    //Api para los gifs
    this.http.get<SearchGifsResponse>(`${this._servicioURL}/search`,{params})
      .subscribe((resp)=> {
        this.resultPeticion = resp.data;
        localStorage.setItem('Gifs',JSON.stringify(this.resultPeticion));
      });


  }
}
