import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  birthYearCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  userForm: FormGroup;
  passwordForm: FormGroup;
  registrationFailed = false;

  static passwordMatch(group: FormGroup): { matchingError: true } | null {
    const password = group.get('password').value;
    const confirm = group.get('confirmPassword').value;
    return password === confirm ? null : { matchingError: true };
  }

  constructor(private userService: UserService,
              formBuilder: FormBuilder,
              private router: Router) {
    this.loginCtrl = formBuilder.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = formBuilder.control('', Validators.required);
    this.birthYearCtrl = formBuilder.control('',
      [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);
    this.confirmPasswordCtrl = formBuilder.control('', Validators.required);
    this.passwordForm = formBuilder.group({
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl
      },
      { validators: RegisterComponent.passwordMatch });
    this.userForm  = formBuilder.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });
  }

  ngOnInit(): void {
  }

  register(): void{
    this.userService.register(this.userForm.value.login,
      this.userForm.value.passwordForm.password,
      this.userForm.value.birthYear).subscribe(
        data => {
      console.log(data);
      this.router.navigate(['/']);
    }, error => {
      this.registrationFailed = true;
      console.log(error, this.registrationFailed);
      }
    );
  }
}
