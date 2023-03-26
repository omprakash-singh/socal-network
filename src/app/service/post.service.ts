import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ref, set } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private database: Database,
    private auth: Auth,
    private router: Router
  ) { }


  async uploadPost(image: string, post: string) {
    const uid = this.auth.currentUser?.uid;
    set(ref(this.database, 'userPost/' + uid), {
      imageUrl: image,
      post: post,
      deletePost: false
    }).then(() => {
      this.router.navigate(['/home/user'])
    })
  }
}
