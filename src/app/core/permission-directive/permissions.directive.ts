import {ChangeDetectorRef, ElementRef, Directive, Input, AfterViewInit} from '@angular/core';
import {AuthFacadeService} from "../../pages/auth/auth.facade.service";

@Directive({
  selector: '[appPermissions]',
  standalone: true
})
export class PermissionsDirective implements AfterViewInit {

  @Input() appPermissions: string[] = [];

  constructor(
    private authFacadeService: AuthFacadeService,
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit() {
    const permissionsString = localStorage.getItem('permissions');
    if (permissionsString) {
      const permissions = JSON.parse(permissionsString);
      this.authFacadeService.permissionsSubject.next(permissions);
    }
  }

  ngAfterViewInit(): void {
    this.authFacadeService.permissionsSubject.subscribe(
      (permissions: string[]) => {
        const userPermissions = permissions.some((permission) =>
          this.appPermissions.includes(permission)
        );
        if (!userPermissions) {
          this.elementRef.nativeElement.style.display = 'none';
        }

        this.cdr.detectChanges();

        console.log(this.elementRef.nativeElement);
        console.log(userPermissions);
      }
    );
  }

}
