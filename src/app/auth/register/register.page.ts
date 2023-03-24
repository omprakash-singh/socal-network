import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  error:boolean = false
  isLoading: boolean = false

  onSubmit(data:NgForm) {
    this.isLoading = true;
    const {email, password} = data.value;

    this.authService.register(email, password).subscribe(()=> {
      this.isLoading = false;
      this.router.navigate(['']);
    }, ()=> {
      this.isLoading = false;
      this.error = true;
    })

  }

}
