import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Router} from "@angular/router";
import {AuthFacadeService} from "../auth.facade.service";
import {AuthResponse, UsersResponse} from "../../../core/interfaces";
import {CookieStorageService} from "../../../core/services/cookie.service";
import {RoleService} from "../../../core/services/role.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy  {

  form: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })

  email: string | undefined;
  sub$ = new Subject();
  user: UsersResponse | undefined;
  constructor(
    private authFacadeService: AuthFacadeService,
  private router: Router,
    private cookieService: CookieStorageService,
    private roleService: RoleService
  ) {
  }

  ngOnInit(): void {
  }


  submit() {
    this.form.markAllAsTouched()

    if (this.form.invalid) return
    console.log(this.form.value)
    this.authFacadeService.login(this.form.value)
      .pipe(
        tap(

          (res: AuthResponse) => {
            this.authFacadeService.updateUser(res.user);
            this.user = res.user;
            this.email = res.user.email;

            const roles = res.user.roles.map((r: any) => r.name);
            const expiration = new Date();
            expiration.setDate(expiration.getDate() + 1);
            this.cookieService.setCookie(
              'roles',
              JSON.stringify(roles),
              expiration
            );
            localStorage.setItem('user', JSON.stringify(res.user));
          }

        )

      ,
      switchMap(() =>
        this.roleService.getMyRole().pipe(
          map((res: any) => {
            const permissions: string[] = [];
            const roles = res.forEach((r: any) => {
              r.permissions &&
              permissions.push(...r.permissions.map((p: any) => p.name));
            });

            localStorage.setItem('permissions', JSON.stringify(permissions));
            this.authFacadeService.permissionsSubject.next(permissions);
          })
        )
      ),
    takeUntil(this.sub$)
  )
      .subscribe( {
          next: res => {

              console.log(res)
              setTimeout(() => {
                this.router.navigate(['/'])
              }, 1000);


          }
        }

      )
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
