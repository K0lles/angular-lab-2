import {Component} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponentComponent} from "./modal-component/modal-component.component";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {NotificationService} from "./notification.service";
import {UserServiceService} from "./user-service.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isChecked = false;
  background: string = '#405ac2';
  sliderValue: number = 200;
  userList: any;


  onToggleChange() {
    this.isChecked = !this.isChecked;
    this.background = this.isChecked ? '#2f8f50' : '#405ac2';
  }

  ngOnInit() {
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
    this.userList = this.userService.getUsers();
  }

  get allUsers(): any {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  constructor(public dialog: MatDialog, private notifications: NotificationService, public userService: UserServiceService) { }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalComponentComponent, {
      width: `${this.sliderValue}px`,
      data: { count: this.formUsers.length, width: this.sliderValue }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: any = [{name: 'Перший'}, {name: 'Другий'}, {name: 'Третій'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: []): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  edit(fruit: [], event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }

  formUsers = [
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

  fb = new FormBuilder();

  usersForm = this.fb.group({
      id: new FormControl({value: '', disabled: true}),
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      type: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()]).+$')]],
      confirmPassword: ['', [Validators.required]],
      subjects: this.fb.array([]),
      description: [''],
      sex: [''],
      phone: ['', [Validators.pattern('^380\\d{9}$')]]
    },
    {
      validators: [this.passwordMatches('password', 'confirmPassword')]
    });



  phoneValidator () {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneRegExp = /^[0-9]{10}$/;
      let isValid = phoneRegExp.test(control.value);
      if (isValid) {
        return {valid: true}
      } else {
        return null;
      }
    };
  }

  passwordMatches(password: string, confirmPassword: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      if (formGroup.controls[confirmPassword].value === formGroup.controls[password].value || formGroup.controls['id'].value) {
        formGroup.controls[confirmPassword].setErrors(null);
        return null;
      } else {
        formGroup.controls[confirmPassword].setErrors({'incorrect': true});
        return {invalid: true};
      }
    }
  }

  get subjects() {
    return this.usersForm.get('subjects') as FormArray;
  }

  addSubject() {
    this.subjects.push(this.fb.control(''))
  }


  generateRandomString(): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  onSubmit() {
    if (this.usersForm.valid) {
      if (!this.usersForm.controls['id'].value) {
        let arr: any = [];
        for ( let subj of this.subjects.controls) {
          arr.push(subj.value);
        }
        let new_user = {
          id: parseInt(this.generateRandomString()),
          name: this.usersForm.controls['name'].value,
          lastname: this.usersForm.controls['lastname'].value,
          type: this.usersForm.controls['type'].value,
          email: this.usersForm.controls['email'].value,
          password: this.usersForm.controls['password'].value,
          confirmPassword: this.usersForm.controls['confirmPassword'].value,
          subjects: arr, // FormArray
          description: this.usersForm.controls['description'].value,
          sex: this.usersForm.controls['sex'].value ? 'MALE' : 'FEMALE', // checkbox
          phone: this.usersForm.controls['phone'].value.toString() // текстове поле з валідатором
        }
        this.userService.addUser(new_user).subscribe(data => {
            this.notifications.showSuccess(data)
          },
          error => {
            this.notifications.showError("Errors occurred!");
          }
        )
      }
      else {
        let elem: any;
        for (let item of this.allUsers) {
          if (item.id === this.usersForm.controls['id'].value) {
            elem = item;
          }
        }
        let arr: any = [];
        for ( let subj of this.subjects.controls) {
          arr.push(subj.value);
        }
        let updating_user = {
          id: this.usersForm.controls['id'].value,
          name: this.usersForm.controls['name'].value,
          lastname: this.usersForm.controls['lastname'].value,
          type: this.usersForm.controls['type'].value,
          email: this.usersForm.controls['email'].value,
          password: this.usersForm.controls['password'].value,
          confirmPassword: this.usersForm.controls['confirmPassword'].value,
          subjects: arr, // FormArray
          description: this.usersForm.controls['description'].value,
          sex: this.usersForm.controls['sex'].value ? 'MALE' : 'FEMALE', // checkbox
          phone: this.usersForm.controls['phone'].value.toString(), // текстове поле з валідатором
        }
        this.userService.updateUser(updating_user).subscribe(data => {
          this.notifications.showSuccess(data);
        },
          error => {
            this.notifications.showError("Errors occurred!");
        })
      }
      while (this.subjects.length) {
        this.subjects.removeAt(0);
      }
      this.usersForm.reset();
    }
    else {
      this.notifications.showError('Errors have occurred while validating!');
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      this.notifications.showSuccess(data)
    },
      error => {
      this.notifications.showError("Errors!")
    })
  }

  putElementIntoForm(id: any) {
    this.usersForm.reset();
    while(this.subjects.length) {
      this.subjects.removeAt(0);
    }
    let elem: any;
    for (let item of this.allUsers) {
      if (item.id === id) {
        elem = item;
      }
    }
    this.usersForm.controls['id'].patchValue(elem.id);
    this.usersForm.controls['id'].disable({onlySelf: true});
    this.usersForm.controls['name'].patchValue(elem.name);
    this.usersForm.controls['lastname'].patchValue(elem.lastname);
    this.usersForm.controls['type'].patchValue(elem.type);
    this.usersForm.controls['email'].patchValue(elem.email);
    this.usersForm.controls['password'].patchValue(elem.password);
    for (let i = 0; i < elem.subjects.length ; i++) {
      let item = elem.subjects[i];
      this.addSubject();
      this.subjects.controls[i].patchValue(item);
    }
    this.usersForm.controls['description'].patchValue(elem.description);
    this.usersForm.controls['sex'].patchValue(elem.sex == 'MALE');
    this.usersForm.controls['phone'].patchValue(elem.phone);
    this.usersForm.setErrors(null);
  }
}

// @Component({
//   selector: 'app-modal',
//   template: `
//     <h2 mat-dialog-title>{{data.name}}</h2>
//     <div mat-dialog-content>
//       <p><strong>Age:</strong> {{data.age}}</p>
//       <p><strong>Email:</strong> {{data.email}}</p>
//     </div>
//     <div mat-dialog-actions>
//       <button mat-button (click)="close()">Close</button>
//     </div>
//   `,
// })
// export class AppComponentDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
//
//   close(): void {
//     // You can do something here when the user clicks "Close"
//   }
// }
