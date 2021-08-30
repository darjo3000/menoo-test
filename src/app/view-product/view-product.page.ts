import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../models/product.model';
import { StoresService } from '../services/stores.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit, AfterViewInit {
  public product: ProductModel;
  @ViewChild('logo', { read: ElementRef }) logo: ElementRef;

  constructor(
    private storesService: StoresService,
    private activatedRoute: ActivatedRoute,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    const name: string = this.activatedRoute.snapshot.paramMap.get('name');
    this.storesService.getProducts2().subscribe(
      (products: ProductModel[]) => {
        this.product = products.filter(p => p.Name == name)[0];
      },
      (error) => {
        console.log(error);
      }
    )
  }

  ngAfterViewInit() {
    this.startAnimation();
  }

  startAnimation() {
    const loadingAnimation = this.animationCtrl.create('loading-animation')
      .addElement(this.logo.nativeElement)
      .duration(1500)
      .iterations(1)
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)');

    loadingAnimation.play();
  }
}
