import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted: boolean = false;
  userLogin:any;

  constructor(private api: ApiService, private router: Router, private http: HttpClient,
    private formBuilder: FormBuilder) {
      
        
     }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      // mobile: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  loginSubmit() {
    this.submitted = true;
    var data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.api.getLoginUser(data).subscribe((res: any) => {
      console.log(4010, res);
      
      if (res.data.length == 1) {
        alert("logged in");
        window.location.reload();
         console.log(res.data[0].Name);
         localStorage.setItem('username', res.data[0].Name )
         
      } else {
        alert("Need to sign up");
      }
    })

  }

}
