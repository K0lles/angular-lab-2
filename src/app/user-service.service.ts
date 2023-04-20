import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    this.initializeUsers();
  }

  private initializeUsers(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.users.next(users);
  }

  public getUsers(): Observable<any[]> {
    return this.users.asObservable();
  }

  public addUser(user: any): Observable<any> {
    const users = this.users.getValue();
    users.push(user);
    this.updateUsersInLocalStorage(users);
    return of("Successfully created!");
  }

  public updateUser(user: any): Observable<any> {
    const users = this.users.getValue();
    throwError("Bad");
    const index = users.findIndex(u => u.id === user.id);
    for (const key in user) {
      if (key in users[index]) {
        users[index][key] = user[key];
      }
    }
    // users[index] = user;
    this.updateUsersInLocalStorage(users);
    return of("Successfully updated existing user!");
  }

  public deleteUser(userId: number): Observable<any> {
    const users = this.users.getValue();
    const index = users.findIndex(u => u.id === userId);
    users.splice(index, 1);
    this.updateUsersInLocalStorage(users);
    return of("Successfully deleted");
  }

  private updateUsersInLocalStorage(users: any[]): void {
    localStorage.setItem('users', JSON.stringify(users));
    this.users.next(users);
    console.log(this.users.getValue());
  }
}
