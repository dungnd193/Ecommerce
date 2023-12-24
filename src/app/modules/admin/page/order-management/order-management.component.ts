import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { combineLatest } from 'rxjs';
import { ProductManagementService } from '../../services/ProductManagementService/product-management.service';
import { OrderManagementService } from '../../services/OrderManagementService/order-management.service';
import {
  IOrder,
  IOrderItem,
  IUserInfo,
} from '../../type/order-management.type';
import { ICategories, IColors } from '../../type/product-management.type';
@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],
})
export class OrderManagementComponent implements OnInit {
  @ViewChild('userTable') userTable!: Table;
  orders!: IOrder[];
  submitted!: boolean;
  colorFilterList: IColors[] = [];
  sizeFilterList: ICategories[] = [];
  statuses = [
    { label: 'Mới đặt hàng', value: 'NEW_ORDER' },
    { label: 'Đang vận chuyển', value: 'DELIVERING' },
    { label: 'Đã giao hàng', value: 'COMPLETED' },
    { label: 'Đã huỷ', value: 'CANCELLED' },
  ];
  constructor(
    private orderService: OrderManagementService,
    private productManagementService: ProductManagementService
  ) {}
  handleFilterBlobal(event: Event) {
    this.userTable.filterGlobal(
      (event.target! as HTMLInputElement).value,
      'contains'
    );
  }

  handleConvertColor(colorId: string) {
    return this.colorFilterList.find((item) => item.id === colorId)?.name;
  }
  handleConvertSize(sizeId: string) {
    return this.sizeFilterList.find((item) => item.id === sizeId)?.name;
  }
  handleTotalPrice(order_list: IOrderItem[]) {
    return order_list.reduce(
      (total, currentValue) =>
        total + currentValue.price! * currentValue.quantity!,
      0
    );
  }
  handleChangeOrderStatus(event: any, id: string) {
    this.orderService.updateOrderStatus(id, event.value);
  }
  ngOnInit(): void {
    this.orderService.getOrders();
    this.productManagementService.getColors();
    this.productManagementService.getSizes();

    combineLatest(
      this.productManagementService.colors$,
      this.productManagementService.sizes$,
      this.orderService.orders$
    ).subscribe((data) => {
      (this.colorFilterList = data[0]),
        (this.sizeFilterList = data[1]),
        (this.orders = data[2]);
    });
  }
}
