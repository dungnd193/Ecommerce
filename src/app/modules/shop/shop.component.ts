import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from './type/shop.type';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { ShopService } from './services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('dataView') dataView!: DataView;
  constructor(private shopService: ShopService) {}
  products!: IProduct[];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;
  sortKey!: string;
  rangeValues: number[] = [20, 80];
  colorFilterList = [
    {
      title: 'Blue',
      color: '#03aeef',
    },
    {
      title: 'Red',
      color: '#f52475',
    },
    {
      title: 'Green',
      color: '#25d5ac',
    },
    {
      title: 'Orange',
      color: '#ff7e00',
    },
    {
      title: 'Black',
      color: '#000',
    },
    {
      title: 'Purple',
      color: '#92399a',
    },
    {
      title: 'Grey',
      color: '#868a93',
    },
  ];
  categoryFilterList = ['Shirt', 'Pant', 'Shoes', 'Accessory'];
  onSortChange(event: any) {
    console.log(event);
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  handleFilterByName(event: Event) {
    this.dataView.filter((event.target! as HTMLInputElement).value);
  }
  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!priceOut' },
      { label: 'Price Low to High', value: 'priceOut' },
    ];
    this.shopService.getProducts();

    this.shopService.products$.subscribe((data) => (this.products = data));
  }
}
