import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { BooksComponent } from '../components/books/books.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { UsersComponent } from '../components/users/users.component';
import { CartComponent } from '../components/cart-component/cart-component.component';

export const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'books', component: BooksComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'cart', component: CartComponent },
];