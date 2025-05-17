import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private roleSubject: BehaviorSubject<string>;
  public role$: Observable<string>;

  constructor(private localStorageService: LocalStorageService) {
    const initialRole = this.localStorageService.getItem('role') || 'guest';
    this.roleSubject = new BehaviorSubject<string>(initialRole);
    this.role$ = this.roleSubject.asObservable();
  }

  setRole(role: string): void {
    this.localStorageService.setItem('role', role);
    this.roleSubject.next(role);
  }

  getRole(): string {
    return this.roleSubject.getValue();
  }
}