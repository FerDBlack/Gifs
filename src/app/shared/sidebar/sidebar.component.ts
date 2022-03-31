import { Component, OnInit } from '@angular/core';
import {GifsService} from "../../gifs/services/gifs.service";
import {SearchGifsResponse} from "../../gifs/interface/gifs.interface";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private gifsService:GifsService) { }

  ngOnInit(): void {
  }

  get resultados():string[]{
    return this.gifsService.historial;
  }

  buscar(termino:string):void{
  this.gifsService.buscarGids(termino);
  }

  borrarTodoHistorial():void{
    let elemento = document.getElementById('historial')!.textContent || "";
    this.gifsService.borrarHistorial();
  }
}
