import { Component, OnInit } from '@angular/core';
import { Auth, User, onAuthStateChanged, sendEmailVerification, updateEmail, updateProfile, } from '@angular/fire/auth';
import { Firestore, doc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore,
    private storage: Storage,
    private alertController: AlertController,
  ) { }


  isLoading: boolean = false;
  UserName: any = ""
  imageUrl: string = "";
  email: string = "";
  isVerified: boolean = false;

  setUser(): void {
    onAuthStateChanged(this.auth, (doc) => {
      this.email = doc?.email as any;
      this.UserName = doc?.displayName as any;
      this.imageUrl = doc?.photoURL as any
      this.isVerified = doc?.emailVerified as any;
    })
  }

  ngOnInit() {
    this.isLoading = true;
    this.setUser()
    this.isLoading = false;
  }

  async profilePictureUplaod(event: any) {
    this.isLoading = true;
    const user = this.auth.currentUser?.uid
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = ref(this.storage, 'profile/' + user);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        this.isLoading = false;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          this.imageUrl = downloadURL
          const user: User | null = this.auth.currentUser
          updateProfile(user as any, {
            photoURL: downloadURL
          })
        });
        this.isLoading = false;
      }
    );

  }

  isEmailSend: boolean = false;
  isEmailSendError: boolean = false;

  onSubmit(data: NgForm) {
    console.log(data);
    console.log(data.value);
    const { displayName, email } = data.value;

    if (displayName.length > 0) {
      updateProfile(this.auth.currentUser as any, {
        displayName: displayName
      }).then(() => {
        this.UserName = displayName
      }).catch((e) => {
        console.log(e.message);

      });
    }

    if (email.length > 0) {
      updateEmail(this.auth.currentUser as any, email).then(() => {
        this.email = email;
      })
    }
  }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Confirm Account',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            onAuthStateChanged(this.auth, (doc) => {
              if (!doc?.emailVerified) {
                sendEmailVerification(this.auth.currentUser as any).then(() => {
                  this.isEmailSend = true;
                  this.isEmailSendError = false;
                }).catch(() => {
                  this.isEmailSendError = true;
                })
              }
            });
          },
        },
      ],
    })
    await alert.present();

  }



  handleRefresh(event: any) {
    setTimeout(() => {
      this.ngOnInit();
      window.location.reload();
    }, 2000);
  };


}
