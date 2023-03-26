import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy  {

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  sub$ = new Subject()

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
        // throw new Error();
    }


  submit() {
    console.log(this.form.value)
    this.authService.signup(this.form.value)
      .pipe(takeUntil(this.sub$))
      .subscribe(res => {
      console.log(res)
    })
    if (this.form.valid) {
      this.router.navigate(["/auth/login"])
      console.log('Form is valid');
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }


  }
  ngOnInit(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
