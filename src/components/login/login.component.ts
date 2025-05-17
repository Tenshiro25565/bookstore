import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../role-service/role-service.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container mt-5">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            [(ngModel)]="username" required="asd"
            name="username"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            [(ngModel)]="password" required="asd"
            name="password"
            class="form-control"
          />
        </div>
        <button class="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  `,
  styles: [``],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private roleService: RoleService) {}

  login() {
    if (this.username === 'admin') {
      this.roleService.setRole('admin'); // Set role to admin
      this.router.navigate(['/users']); // Redirect admin to Users tab
    } else if (this.username === 'member') {
      this.roleService.setRole('member'); // Set role to member
      this.router.navigate(['/books']); // Redirect member to Books tab
    } else {
      this.roleService.setRole('guest'); // Set role to guest
      this.router.navigate(['/books']); // Redirect guest to Books tab
    }
  }
}