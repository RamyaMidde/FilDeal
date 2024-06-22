import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  unamePattern = "^[a-z0-9_-]{8,15}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  registerForm!: FormGroup;
  submitted = false;
  loading: boolean = false;

  constructor(private api: ApiService, private router: Router, private http: HttpClient,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  signupSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.api.addSignUp(this.registerForm.value).subscribe((res: any) => {
      if (res.status === 200) {
        alert('Customer signup sucessfully...!')
      } else if (res.status == 300) {
        alert('Already this email is exits Please login');
        // this.router.navigate(['/login']);
      } else {
        alert('server error')
      }
    })

  }


}
