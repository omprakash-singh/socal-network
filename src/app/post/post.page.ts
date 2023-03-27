import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  constructor(private storage: Storage, private auth: Auth, private postService: PostService) { }

  postImage: string = "";
  isLoading: boolean = false;

  ngOnInit() {
  }

  postPictureUplaod(event: any) {
    this.isLoading = true;
    const user = this.auth.currentUser?.uid
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = ref(this.storage, 'post/' + user);
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
          this.postImage = downloadURL
          console.log(downloadURL);

        });
        this.isLoading = false;
      }
    );

  }

  onSubmit(data: NgForm) {
    console.log(this.postImage);
    console.log(data.value);
    this.postService.uploadPost(this.postImage, data.value.post);
    data.resetForm();
  }

}
