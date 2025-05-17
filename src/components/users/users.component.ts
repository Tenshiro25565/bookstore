import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  template: `
    <div class="container mt-5">
      <h2>Users</h2>
      <button class="btn btn-primary mb-3" *ngIf="isAdmin" (click)="addUser()">
        Add User
      </button>
      <table class="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th *ngIf="isAdmin">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td *ngIf="isAdmin">
              <button class="btn btn-warning btn-sm" (click)="editUser(user)">
                Edit
              </button>
              <button class="btn btn-danger btn-sm" (click)="deleteUser(user.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [``],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  isAdmin = false;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const role = this.localStorageService.getItem('role'); // Retrieve role
    console.log('Retrieved role from localStorage:', role);
    this.isAdmin = role === 'admin';

    const storedUsers = this.localStorageService.getItem('users');
    if (storedUsers) {
      this.users = storedUsers;
    } else {
      this.http.get('/assets/users.json').subscribe((data: any) => {
        this.users = data;
        this.localStorageService.setItem('users', this.users); // Save to localStorage
      });
    }
  }

  addUser() {
    const username = prompt('Enter username:');
    const role = prompt('Enter role (admin, member, guest):');
    if (username && role) {
      const newUser = { id: Date.now(), username, role };
      this.users.push(newUser);
      this.localStorageService.setItem('users', this.users); // Save to localStorage
    }
  }

  editUser(user: any) {
    const username = prompt('Edit username:', user.username);
    const role = prompt('Edit role (admin, member, guest):', user.role);
    if (username && role) {
      user.username = username;
      user.role = role;
      this.localStorageService.setItem('users', this.users); // Save to localStorage
    }
  }

  deleteUser(userId: number) {
    this.users = this.users.filter((user) => user.id !== userId);
    this.localStorageService.setItem('users', this.users); // Save to localStorage
  }
}