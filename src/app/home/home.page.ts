import { Component, OnInit } from '@angular/core';
import { StoresService } from '../services/stores.service';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public products: ProductModel[] = [];
  private allProducts: ProductModel[] = [];
  private productsFiltered: ProductModel[] = [];
  private pageLimit = 10;
  private rowNumber = 1;

  constructor(private storesService: StoresService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.storesService.getProducts2().subscribe(
      (response: ProductModel[]) => {
        this.allProducts = response;
        this.productsFiltered = this.allProducts;
        this.reset();
        this.getAllProductsByInfinite(false, "");
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getAllProductsByInfinite(isFirstLoad, event) {
    if (this.products.length >= this.productsFiltered.length) {
      event.target.complete();
    }

    for (let p = 0; p < this.pageLimit; p++) {
      if (this.rowNumber <= this.productsFiltered.length) {
        this.products.push(this.productsFiltered[this.rowNumber - 1]);
        this.rowNumber = this.rowNumber + 1;
      }
    }

    if (isFirstLoad) {
      event.target.complete();
    }
  }

  moreData(event) {
    this.getAllProductsByInfinite(true, event);
  }

  async filterList(event) {
    const searchTerm: string = event.srcElement.value;
    
    if (searchTerm == "") {
      this.productsFiltered = this.allProducts;
      this.reset();
      this.getAllProductsByInfinite(false, "");
      return;
    }
    
    this.productsFiltered = this.allProducts.filter(p => p.Name.includes(searchTerm));
    this.reset();
    this.getAllProductsByInfinite(false, "");
  }

  private reset() {
    this.rowNumber = 1;
    this.products = [];
  }

}
