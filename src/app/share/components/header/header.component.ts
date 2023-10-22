import { Component, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CartService } from 'app/modules/cart/service/cart.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn!: boolean;
  userMenu!: MenuItem[];
  cartProductsNumber!: number;
  pages = ['HOME', 'SHOP', 'PAGE', 'CONTACT', 'BLOG'];
  pathName = '';
  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.userMenu = [
      {
        label: '',
        items: [
          { label: 'Logout', command: () => {
              localStorage.removeItem('role')
              localStorage.removeItem('accessToken')
              this.router.navigate(['/home']);
            }
          },
          { label: 'My profile', command: () => this.router.navigate(['/user']) },
          { label: 'My order' },
        ],
        icon: 'pi pi-user'
      }
    ],
    this.cartService.getCartProducts();
    this.pathName = window.location.pathname.split('/')[1];
    this.cartService.cartProducts$.subscribe((data) => {
      this.cartProductsNumber = data.length;
    });
  }
  ngDoCheck(): void {
    this.isUserLoggedIn = localStorage
      .getItem('role')!
      ?.includes("USER");
  }
}
