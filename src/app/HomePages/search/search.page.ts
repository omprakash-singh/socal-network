import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, getDocs, limit } from "firebase/firestore";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(
    private fireStore: Firestore
  ) { }
  items: any = [];
  Readmore: boolean = false

  ngOnInit() {

  }

  async search(event: any) {
    const value = event.target.value;
    const q = query(collection(this.fireStore, "post"), where("writerName", "==", value));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((d) => {
      this.items.push(d.data())
    })

  }

}
