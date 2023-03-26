import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import {Router} from "@angular/router";



@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {

  constructor(
    private userService: UserService,
    private toast: HotToastService,
    private router: Router
  ) { }

  errorMessage: string | undefined;

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword');
    const confirmPassword = control.get('checkPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    } else {
      return null;
    }

  };

  form: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    checkPassword: new FormControl('', [Validators.required]),
  }, this.passwordMatchValidator)




  onSubmit() {
    const oldPasswordControl = this.form.get('oldPassword');
    const newPasswordControl = this.form.get('newPassword');
    const checkPasswordControl = this.form.get('checkPassword');

    if (oldPasswordControl && newPasswordControl && checkPasswordControl) {
      const oldPassword = oldPasswordControl.value;
      const newPassword = newPasswordControl.value;
      const checkPassword = checkPasswordControl.value;

      this.userService.updatePassword(oldPassword, newPassword, checkPassword).subscribe(
        res => {
          console.log(res)
        },
        (error) => {
          this.errorMessage = error.message;
          this.toast.error('Wrong Password');
        }
      );

      this.router.navigate(['/auth'])
    }
  }
}
