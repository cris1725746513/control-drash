import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
	public url: string;
	public params: string='';

	constructor(	private httpClient: HttpClient){
		this.url = Global.url+"productos";
	}

	//Metodo para retornar todo el inventario activo del servidor
	getInventory(): Observable<any>{
	  	let headers = new HttpHeaders().set("Content-Type", "application/json");
	  	return this.httpClient.get<Array<any>>(this.url);
	}

	//Metodo para obtener los productos deshabilitados del inventario
	getDisabledProducts(): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this.httpClient.get(this.url+"/obtain/false", {headers: headers});
	}

	//Metodo para guardar un nuevo producto
	addProduct(product:any): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		let newProduct = JSON.stringify(product);
		return this.httpClient.post(this.url+"/add",newProduct , {headers: headers});
	}

	//Metodo para obtener un solo producto de la base de datos
	getProduct(id:any): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this.httpClient.get(this.url+"/get/"+id, {headers: headers});
	}

	//Metodo para actualizar un producto
	updateProduct(product:any): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this.httpClient.put(this.url+"/update/"+product._id, product, {headers: headers});
	}

	//Metodo para habilitar o inhabilitar un producto
	updateEnabled(enabled:any, id:any): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		if(enabled){
			return this.httpClient.put(this.url+"/enable/"+id, {headers: headers});
		}else{
			return this.httpClient.put(this.url+"/disable/"+id, {headers: headers});
		}
	}

	//Metodo para obtener un producto mediante el nombre o la marca
	getProductBy(params:any): Observable<any>{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this.httpClient.post(this.url+"/get-by", params, {headers: headers});
	}
}
