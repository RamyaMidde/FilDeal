import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastrService: ToastrService) {
  }


  public showSuccess(message:any, title:any): void {
    this.toastrService.success(message, title);
  }

  public showInfo(message:any, title:any): void {
    this.toastrService.info(message, title);
  }

  public showWarning(message:any, title:any): void {
    this.toastrService.warning(message, title);
  }

  public showError(message:any, title:any): void {
    this.toastrService.error(message, title);
  }
}
