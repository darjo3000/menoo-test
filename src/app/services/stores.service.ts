import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EndpointConstant } from '../constants/endpoint.constant';

@Injectable()
export class StoresService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(environment.baseUrlApiLocal + 'products');
  }

  getProducts2(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('/api' + '/' + EndpointConstant.STORE + '/ItemsForExercise');
  }

}