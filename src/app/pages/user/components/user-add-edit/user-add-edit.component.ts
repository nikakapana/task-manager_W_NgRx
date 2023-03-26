import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    identityNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    
  })

  constructor(
    public dialogRef: MatDialogRef<UserAddEditComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
      if (this.data.userId) {
        this.userService.getUser(this.data.userId).subscribe((res) => {
          this.form.patchValue(res)
        })
      }
  }

  onSubmit(){
    this.form.markAllAsTouched()
    if(this.form.invalid){
      return
    }

    this.userService.createUser(this.form.value).subscribe((res) => {
      this.dialogRef.close(res)
    })
  }

}
