import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth,
    private actionSheetCtrl: ActionSheetController
  ) { }

  Readmore: boolean = false;
  longText: string = "";
  profileImg: string = ""
  userName: string = "";
  items: any = [];

  setUserInt(): void {
    onAuthStateChanged(this.auth, (doc) => {
      if (doc) {
        this.userName = doc.displayName as any
        this.profileImg = doc.photoURL as any;
      }
    })
  }

  setPostInt(): void {
    this.longText = `this is for testing perpose show`;
  }

  ngOnInit() {
    this.setPostInt();
    this.setUserInt();
    this.generateItems();
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 2000);
  };

  onLogout() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['auth/login'])
    })
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 10; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  result: string = "";

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Edit',
          data: {
            action: 'Edit',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  }

}
