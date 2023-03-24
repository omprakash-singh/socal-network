import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.page.html',
  styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  isLoading:boolean = false
  error:boolean = false;
  success: boolean = false;

  onSubmit(data:NgForm) {
    this.isLoading = true;
    const {email} = data.value;
    this.authService.forgottenPassword(email).subscribe(()=> {
      this.isLoading = false;
      this.success = true;
    }, ()=> {
      this.isLoading = false;
      this.error = true;
    })
  }

}
