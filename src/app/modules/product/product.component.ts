import { ProductManagementService } from './../admin/services/ProductManagementService/product-management.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/service/cart.service';
import { ProductService } from './service/product.service';
import { IProduct, IProductFeedback } from './type/product.type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private activeRouter: ActivatedRoute,
    private productService: ProductService,
    private productManagementService: ProductManagementService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}
  id!: string;
  product!: IProduct;
  feedbackList!: IProductFeedback[];
  cartProducts!: IProduct[];
  formFeedback: FormGroup = new FormGroup({
    vote: new FormControl(4),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl(''),
  });
  productInfo: FormGroup = new FormGroup({
    colorNSize: new FormControl(),
  });
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  selectedSize: any = null;
  sizes: any[] = [
    { name: 'M', key: 'M' },
    { name: 'L', key: 'L' },
    { name: 'XL', key: 'XL' },
    { name: 'XXL', key: 'XXL' },
  ];
  thumbnailImgList: string[] = [];

  handleRatingReview(rating: number) {
    return Number(rating.toString()[0]) % 5;
  }

  handleAddProduct() {
    const colorId = this.productInfo.get('colorNSize')?.value?.colorId;
    const sizeId = this.productInfo.get('colorNSize')?.value?.sizeId;
    if (!colorId || !sizeId) {
      this.toastr.error('Please select color and size');
      return;
    }
    console.log(this.product);
    const product = {
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      colorId,
      sizeId,
      price: this.product.price,
      nameUrlImage: this.product.nameUrlImage,
      quantity: 1,
    };
    this.cartService.addProductToCart(product);
  }

  handleAddReview() {
    this.productService.saveProductFeedback({
      ...this.formFeedback.value,
      proId: this.id,
      createAt: Date.now(),
    });
  }

  getRandomTime() {
    return new Date();
  }
  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];

    this.productService.getProduct(this.id);
    this.productService.getProductFeedback(this.id);

    this.productService.product$.subscribe((data) => {
      this.product = data;
      this.thumbnailImgList = this.product.nameUrlImage || [];
      if (Object.keys(data).length) {
        const product = { ...data, viewCount: data.viewCount! + 1 };
        console.log(data);
        this.productManagementService.editProduct(product, false);
      }
    });
    this.productService.productFeedback$.subscribe(
      (data) => ((this.feedbackList = data), console.log(data))
    );

    this.selectedSize = this.sizes[1];
  }

  ngOnDestroy(): void {
    this.thumbnailImgList = [];
  }
}
