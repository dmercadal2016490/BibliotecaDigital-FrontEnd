import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(librosBuscar: any, search: any): any {
    if(search == undefined){
      return librosBuscar
    }else{
      return librosBuscar.filter(libros=>{
        return libros.titulo.toLowerCase().includes(search.toLowerCase()) ||
        libros.bibliografia.toLowerCase().includes(search.toLowerCase()) ||
        libros.autor.toLowerCase().includes(search.toLowerCase()) ||
        libros.palabrasClaves.toLowerCase().includes(search.toLowerCase()) ||
        libros.temas.toLowerCase().includes(search.toLowerCase()) ||
        libros.frecuencia.toLowerCase().includes(search.toLowerCase())
     })
    }
  }

}
