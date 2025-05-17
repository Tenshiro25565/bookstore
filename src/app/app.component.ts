import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoleService } from '../components/role-service/role-service.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Bookstore</a>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" routerLink="/">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/books">Books</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/categories">Categories</a>
        </li>
        <li class="nav-item" *ngIf="isMember">
        <a class="nav-link" routerLink="/cart">Cart</a>
      </li>
        <li class="nav-item" *ngIf="isAdmin">
          <a class="nav-link" routerLink="/users">Users</a>
        </li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class AppComponent {
  isAdmin = false;
  isMember = false;

  constructor(private roleService: RoleService) {}

   ngOnInit() {
    // Subscribe to role changes
    this.roleService.role$.subscribe((role) => {
      this.isAdmin = role === 'admin';
      this.isMember = role === 'member';
    });
  }
}

