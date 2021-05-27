import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdmin } from '../adminmodule/admins';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { map } from 'rxjs/operators'
import { AsyncPipe } from '@angular/common';
import * as firebase from 'firebase';
import { templateJitUrl } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
temp:any
  constructor(private afs:AngularFirestore) { }
  getAdmin(email:string) {
     this.afs.collection('admins',ref => ref.where('email', '==', email)).snapshotChanges()
    .pipe()
    .subscribe(data => {
      data.forEach( d=> {
        this.temp =  (d.payload.doc.data())
      })
    });
    return this.temp
  }
}