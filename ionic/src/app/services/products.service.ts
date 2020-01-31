import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConnectToServerService } from './connectToServer.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( 
    public http: HttpClient,
    public connectToServerService: ConnectToServerService,
  ) { }

  public getProducts(){
    return this.http.get(this.connectToServerService.serverUrl + '/getProducts')
  }

  async sortProductsByType(input, output){
    for(let i = 0; i < input.length; i++){
      let product = input[i];
      output[product.Type].push(product);
    }
  }

}
