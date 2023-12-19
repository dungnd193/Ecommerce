import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/modules/cart/service/cart.service';
import { UserService } from 'app/modules/user/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartProductsNumber!: number;
  pages = ['HOME', 'SHOP', 'PAGE', 'CONTACT', 'BLOG'];
  pathName = '';
  constructor(private cartService: CartService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
    this.cartService.getCartProducts();
    this.pathName = window.location.pathname.split('/')[1];
    this.cartService.cartProducts$.subscribe((data) => {
      this.cartProductsNumber = data.length;
    });
  }
}
