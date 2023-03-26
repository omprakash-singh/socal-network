import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth
  ) { }

  Readmore: boolean = false;
  longText: string = "";
  profileImg: string = ""
  userName: string = ""

  setUserInt(): void {
    onAuthStateChanged(this.auth, (doc) => {
      if (doc) {
        this.userName = doc.displayName as any
        this.profileImg = doc.photoURL as any;
      }
    })
  }

  setPostInt(): void {
    this.longText = ``;
  }

  ngOnInit() {
    this.setPostInt();
    this.setUserInt();
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.setPostInt()
      this.setUserInt()
      event.target.complete();
    }, 2000);
  };

  onLogout() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['auth/login'])
    })
  }


}
