import { Component } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
import { User } from "./models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";
  user: User = {
    uid: "hogehoge@hoge.com",
    email: "hogehoge@hoge.com",
    password: "hogehoge",
    name: "hogehoge",
    gid: ["hoge"],
    photoURL: "hoge",
    nomi: 0
  };
  user2: User = {
    uid: "hoge@hoge.com",
    email: "hoge@hoge.com",
    password: "hoge",
    name: "hoge",
    gid: ["hoge"],
    photoURL: "hoge",
    nomi: 0
  };
  users: Observable<User[]>;

  constructor(private afs: AngularFirestore, private service: AuthService) {
    this.service.setAfStore(this.afs);

    // this.service.createUserData(this.user);
    // this.service.getUserData(this.user).subscribe(result => {
    //   this.user = result;
    // });
    // this.service.updateUserData(this.user2);
    // this.service
    //   .getUserData(this.user)
    //   .subscribe(result => (this.user2 = result));
    this.service
      // .login("hoge@hoge.com", "hoge")
      .getUserData(this.user2)
      .subscribe(res => (this.user = res));
    this.user.name = "aaa";
  }
}
