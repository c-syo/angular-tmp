import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// 以下追加したもの
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import * as firebase from "firebase/app";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "./../models/user";

@Injectable()
export class AuthService {
  private afStore: AngularFirestore;
  private afAuth: AngularFireAuth;
  private user: User;
  nullUserData: User = {
    uid: "",
    email: "",
    password: "",
    name: "",
    gid: [""],
    photoURL: "",
    nomi: 0
  };
  private users: User[];

  constructor() {}

  /*   siginUp(name: string, email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        return this.updateUserData(user);
      })
      .catch(err => console.log(err));
  }
  */

  login(email: string, password: string): Observable<User> {
    // return this.afAuth.auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then(user => {
    //     return this.updateUserData(user);
    //   })
    //   .catch(err => console.log(err));
    const data: User = {
      uid: email,
      email: email,
      password: password,
      name: this.nullUserData.name,
      gid: this.nullUserData.gid,
      photoURL: this.nullUserData.photoURL,
      nomi: this.nullUserData.nomi
    };
    this.getUserData(data).subscribe(res => {
      if (res) {
        if (res.password == data.password) {
          this.user = res;
        }
      }
      this.user = this.nullUserData;
    });
    return of(this.user);
  }
  /*
  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/login"]);
    });
  } */
  public createUserData(user: User) {
    const data: User = {
      uid: user.uid,
      email: user.email,
      password: user.password,
      name: user.name || "",
      gid: user.gid || [""],
      photoURL: user.photoURL || "",
      nomi: user.nomi
    };
    this.afStore.doc(`items/${user.uid}`).set(data);
  }
  public updateUserData(user: User) {
    const data: User = {
      uid: user.uid,
      email: user.email,
      password: user.password,
      name: user.name || "",
      gid: user.gid || [""],
      photoURL: user.photoURL || "",
      nomi: user.nomi
    };
    return this.afStore.doc(`items/${user.uid}`).set(data);
  }
  public getUserData(user: User) {
    this.afStore
      .doc<User>(`items/${user.uid}`)
      .valueChanges()
      .subscribe(result => {
        if (result) {
          this.user = result;
        } else {
          this.user = this.nullUserData;
        }
      });
    return of(this.user);
  }
  public getUsersData(nomi: number) {
    return this.afStore
      .collection<User>("items", ref => ref.where("nomi", "==", nomi))
      .valueChanges();
  }
  public setAfStore(afStore: AngularFirestore) {
    this.afStore = afStore;
  }
  public setAfAuth(afAuth: AngularFireAuth) {
    this.afAuth = afAuth;
  }
}
