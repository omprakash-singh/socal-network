import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.page.html',
  styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(data:NgForm) {
    console.log(data.value);
    
  }

}
