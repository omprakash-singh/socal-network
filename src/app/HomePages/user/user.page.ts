import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { PostService } from 'src/app/service/post.service';
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';

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
    private actionSheetCtrl: ActionSheetController,
    private postService: PostService,
    private fireStore: Firestore
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

  async ngOnInit() {
    this.setPostInt();
    this.setUserInt();
    const uid = this.auth.currentUser?.uid

    const q = query(collection(this.fireStore, "post"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      this.items.push({
        data: doc.data(),
        id: doc.id
      });
    });

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



  result: string = "";

  async presentActionSheet(id: string) {
    const db = this.fireStore;
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          async handler() {
            console.log(id);
            await deleteDoc(doc(db, "post", id)).then((s) => {
              window.location.reload()
            })
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
