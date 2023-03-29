import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private database: Database,
    private fireStore: Firestore,
    private auth: Auth,
    private router: Router
  ) { }


  uploadPost(image: string, post: string, writerName: any) {
    const uid = this.auth.currentUser?.uid;
    return from(addDoc(collection(this.fireStore, "post"), {
      post: post,
      imageUrl: image,
      uid: uid,
      postDate: Timestamp.fromDate(new Date("December 10, 1815")).toDate(),
      writerName: writerName
    }))
  }

  async getPostForUser() {
    const uid = this.auth.currentUser?.uid;
    const q = query(collection(this.fireStore, "post"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
}
