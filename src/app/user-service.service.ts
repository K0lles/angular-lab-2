import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    let initialFormUsers = [
      {
        id: 1, // генерується автоматично
        name: 'Djamshut', // текстове поле (обов'язкове поле)
        lastname: 'Mamaev', // текстове поле (обов'язкове поле)
        type: 'Type B', // селект або радіобатони
        email: 'mail@mail.com', // текстове поле з валідатором
        password: 'Helloworld1!', // текстове поле з валідатором (обов'язкове
        confirmPassword: 'Helloworld1!', // текстове поле з валідатором
        subjects: ['1', '2', '3'], // FormArray
        description: 'gbnfgb', // textarea
        sex: 'MALE', // checkbox
        phone: '380453453454' // текстове поле з валідатором
      },
      {
        id: 2, // генерується автоматично
        name: 'Victor', // текстове поле (обов'язкове поле)
        lastname: 'Velichko', // текстове поле (обов'язкове поле)
        type: 'Type C', // селект або радіобатони
        email: 'mail@mail.com', // текстове поле з валідатором
        password: 'Helloworld1!', // текстове поле з валідатором (обов'язкове
        confirmPassword: 'Helloworld1!', // текстове поле з валідатором
        subjects: ['1', '2', '3'], // FormArray
        description: '', // textarea
        sex: 'MALE', // checkbox
        phone: '380453453454' // текстове поле з валідатором
      }
    ]
    const users = JSON.stringify(initialFormUsers);
    localStorage.setItem('users', users);
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
    const index = users.findIndex(u => u.id === user.id);
    for (const key in user) {
      if (key in users[index]) {
        users[index][key] = user[key];
      }
    }
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
