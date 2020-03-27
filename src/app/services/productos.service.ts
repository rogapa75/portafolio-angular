import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';




@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 

    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise ((resolve, reject) => {
 this.http.get('https://curso-angula-html.firebaseio.com/productos_idx.json')
    .subscribe((resp: Producto[]) => {
        console.log(resp);
        this.productos = resp;
        this.cargando = false;
        resolve();
    });

   

        // para verificar que funcione el Load
        // setTimeout(() => {
        //   this.cargando = false;  
        // }, 2000);

    });     
  }

  getProducto(id: string){

    // ``````
    return this.http.get(`https://curso-angula-html.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string){

    if (this.productos.length == 0){
      // cargar productos
      this.cargarProductos().then( () => {
        // Ejecutar despues de tener los productos
        // aplicar filtro
        this.filtrarProductos(termino);
      })
    }else {
      // aplicar filtro
      this.filtrarProductos(termino);
    }

    // this.productosFiltrado = this.productos.filter(Producto => {
    //   return true;
    // } );

    // console.log(this.productosFiltrado);


  }

  private filtrarProductos(termino : string){
    this.productosFiltrado= [];

    termino = termino.toLocaleLowerCase();
      // console.log(this.productos);
      this.productos.forEach( prod => {
        const tituloLower = prod.titulo.toLocaleLowerCase();
          if(prod.categoria.indexOf( termino) >= 0 || tituloLower.indexOf( termino) >= 0
          ){
            this.productosFiltrado.push(prod);
          }
      });

  }

}
