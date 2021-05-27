import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterModule, Router } from '@angular/router';
import { AdminAuthService } from '../adminServices/admin-auth.service';
import { AdminMembersService } from '../adminServices/admin-members.service';

@Component({
  selector: 'app-adminmodule',
  templateUrl: './adminmodule.component.html',
  styleUrls: ['./adminmodule.component.css']
})
export class AdminmoduleComponent implements OnInit {

  adminid:any;
  adminProfile;
  reqUsers:any;
  badge:any;
  constructor(private memberSer: AdminMembersService,private afs:AngularFirestore) { }

  ngOnInit() {

    this.afs.collection('admins',ref => ref.where('id', '==', 1)).valueChanges().subscribe(data => data.forEach(d=> console.log(d)))
    if (sessionStorage) {
      this.adminid = sessionStorage.getItem("adminid");
      if (this.adminid != null) {
        console.log("Ayyo moonjipooye",this.adminid);
      }
    }
    this.adminProfile = sessionStorage.getItem('adminName')

    // this.get();
    // this.getReq();
    
  }


  // get() {
    // console.log("in get",id)
    // this.afs.collection('admins',ref => ref.where('id', '==', id)).snapshotChanges().pipe()
    // .subscribe(data => {
    //   data.forEach(d=> {
    //     this.adminProfile = JSON.stringify (d.payload.doc.data())
    //   })
    // });
    // this.adminProfile = JSON.parse(this.adminProfile)
    // console.log(typeof(this.adminProfile),this.adminProfile)
  // }

  resetSession() {
    sessionStorage.removeItem("adminid");

  }

  getReq() {
    this.reqUsers = this.memberSer.getMemReq();
    console.log(this.reqUsers);
    if (this.reqUsers.length == null || this.reqUsers.length == 0) {
      this.badge = null;
    }
    else if (this.reqUsers.length != 0) {
      this.badge = this.reqUsers.length;
    }
  }
}
