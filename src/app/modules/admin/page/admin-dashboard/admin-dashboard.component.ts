import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../services/AdminDashboardService/admin-dashboard.service';
import { ProductManagementService } from '../../services/ProductManagementService/product-management.service';
import { combineLatest } from 'rxjs';
import { IProduct } from 'app/modules/product/type/product.type';
import moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';

interface Product {
  name: string;
  code: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private adminDashboardService: AdminDashboardService,
    private productService: ProductManagementService,

  ) { }
  StatisticForm!: FormGroup;
  stateOptions: any[] = [
    { label: 'Thống kê sản phẩm đã bán', value: 'TK1' },
    { label: 'Thống kê sản phẩm tồn kho', value: 'TK2' }
  ];
  products: IProduct[] = [
    {
      "id": "",
      "name": "Tất cả sản phẩm",
      "description": "",
      "code": "",
      "category": {
        "id": "",
        "name": ""
      },
      "quantity": [],
      "price": 0,
      "status": "",
      "brand": "",
      "discount": 0,
      "viewCount": 0,
      "nameUrlImage": []
    }
  ];;
  chartData: any;
  options = {
    responsive: false,
    maintainAspectRatio: false,
  };
  data: any;
  chartOptions = {
    responsive: false,
  };
  selectedProduct: IProduct | undefined;
  startDate!: Date;
  endDate!: Date;
  maxDate!: Date;

  handleStatistic() {
    // console.log(this.StatisticForm.value)
    this.adminDashboardService.getOrderInRangeTime(
      {
        startDate: this.startDate,
        endDate: this.endDate,
        productId: this.selectedProduct!.id!
      }
    )
  }

  ngOnInit(): void {
    this.StatisticForm = new FormGroup({
      value: new FormControl('TK1')
    });
    this.startDate = new Date();
    this.startDate.setDate(1);

    this.endDate = new Date();
    this.maxDate = new Date();

    this.selectedProduct = this.products[0]

    this.productService.getProducts({ page: 1, size: 9999 });
    this.adminDashboardService.getOrderInRangeTime(
      {
        startDate: this.startDate,
        endDate: this.endDate,
      }
    )

    combineLatest([
      this.productService.products$,
      this.adminDashboardService.dataStatistic$,
    ]).subscribe((data) => {
      this.products = [
        {
          "id": "",
          "name": "Tất cả sản phẩm",
          "description": "",
          "code": "",
          "category": {
            "id": "",
            "name": ""
          },
          "quantity": [],
          "price": 0,
          "status": "",
          "brand": "",
          "discount": 0,
          "viewCount": 0,
          "nameUrlImage": []
        },
        ...data[0]
      ];

      this.chartData = {
        labels: data[1].map(item => moment(item.date).format('DD MMM')),
        datasets: [
          {
            label: 'Sản phẩm đã bán',
            backgroundColor: '#42A5F5',
            data: data[1].map(item => item.quantity),
          },
        ],
      };
    });

    this.data = {
      labels: [
        'Total Income',
        'Total Expences',
        'Cash on Hand',
        'Net Profit Margin',
      ],
      datasets: [
        {
          data: [579000, 79000, 92000, 179000],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#9C7B82'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#9C7B82'],
        },
      ],
    };



  }
}
