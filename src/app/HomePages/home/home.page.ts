import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { query } from '@angular/fire/database';
import { Firestore, collection, doc, getDoc, getDocs, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }
  items: any = [];
  Readmore: boolean = false;
  userName: string = '';

  setUserInt(): void {
    onAuthStateChanged(this.auth, (doc) => {
      if (doc) {
        this.userName = doc.displayName as any
      }
    })
  }

  async ngOnInit() {

    const colRef = collection(this.firestore, 'post');
    const docsSnap = await getDocs(colRef)

    docsSnap.forEach(doc => {
      this.items.push(doc.data());
    })
  }
}
