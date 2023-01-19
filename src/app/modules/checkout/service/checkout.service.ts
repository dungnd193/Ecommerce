import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IOrder } from '../type/checkout.type';
import { CheckoutApiService } from './checkout-api.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(
    private toastr: ToastrService,
    private checkoutApiService: CheckoutApiService
  ) {}
  addOrder(order: IOrder) {
    this.checkoutApiService.addOrder(order).subscribe((data) => {
      console.log(data);
      this.toastr.success('Order successfully!');
    });
  }
}
