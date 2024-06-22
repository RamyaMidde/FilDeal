import { Component, OnInit } from '@angular/core';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  loadFooter: boolean = true;
  submitted: boolean = false;
  subscribeForm!: FormGroup;
  constructor(private apiKey: ApiKeyService, private fb: FormBuilder) { }



  ngOnInit(): void {
    this.subscribeForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  get f() {
    return this.subscribeForm.controls;
  }

  addCustmrSubscribe() {
    this.submitted = true;
    if (this.subscribeForm.invalid) {
      return;
    }
    var data = this.subscribeForm.value;
    console.log(13333, data);
    this.apiKey.addCustmrSubscribe(data).subscribe((res: any) => {
      if (res.status == 300) {
        alert('customer already subscribed...!');
        this.subscribeForm.reset();
      } else if (res.status == 200) {
        alert('customer subscribed sucessfully...!');
        this.submitted = false;
        this.subscribeForm.reset();
      }
    })
  }


}
