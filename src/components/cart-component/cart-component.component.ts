import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2>Shopping Cart</h2>
      <table class="table" *ngIf="cart.length > 0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let book of cart">
            <td>{{ book.title }}</td>
            <td>{{ book.price | currency }}</td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="cart.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <h3 *ngIf="cart.length > 0">Total: {{ totalPrice | currency }}</h3>
      <button
        class="btn btn-primary"
        *ngIf="cart.length > 0"
        (click)="checkout()"
      >
        Checkout
      </button>
    </div>
  `,
  styles: [``],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  totalPrice = 0;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    const storedCart = this.localStorageService.getItem('cart') || { cart: [], totalPrice: 0 };
    this.cart = storedCart.cart;
    this.totalPrice = storedCart.totalPrice;
  }

  checkout() {
    this.cart = [];
    this.totalPrice = 0;
    this.localStorageService.setItem('cart', { cart: [], totalPrice: 0 });
    alert('Checkout successful!');
  }
}