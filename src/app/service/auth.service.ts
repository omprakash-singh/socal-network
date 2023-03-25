import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  register(email:string, password:string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password:string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  forgottenPassword(email: string) {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  signOut() {
    return from(signOut(this.auth));
  }
}
