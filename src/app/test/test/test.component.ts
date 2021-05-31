import { AsyncPipe } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import{ AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { IAdmin } from 'src/app/adminmodule/admins';
import { AdminAuthService } from '../../adminServices/admin-auth.service'
import { ActivatedRoute } from '@angular/router';
// import database from 'firebase'
import { FirebaseApp } from '@angular/fire'
import { inject, waitForAsync } from '@angular/core/testing';
import { ThisReceiver } from '@angular/compiler';
import { IMember } from 'src/app/adminmodule/members/members';
import { AdminMembersService } from 'src/app/adminServices/admin-members.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  query: any;
  allCity: unknown[];
  members!: Observable<IMember[]>;

  constructor(public memberSer: AdminMembersService,public db:AngularFireDatabase,private afs:AngularFirestore,private aas:AdminAuthService,private route:ActivatedRoute) 
  { 
    console.log("this.db.list: ",this.db.list('/admins').valueChanges())
  }

  userEmail:any;

  temp:any
  async forfunction() {
   let mailCheck: Boolean;

      this.members.forEach(member =>{
        member.forEach(mem=>{
          console.log(mem.uadmid)
          console.log("ustatus:  ",mem.ustatus)
          console.log(mem.id,typeof(mem.id))
          if(mem.uadmid == this.userEmail) {
            mailCheck=false;
            console.log("already exist")
          }
        })
      })
     setTimeout(()=>console.log(mailCheck),900) 
    // this.allCity.forEach(city=>{
    //   console.log(city['name'])
    // })
    // console.log(length(this.members))
    
      // this.members.forEach(member => {
      //   console.log(member[0].uname)
      //   console.log(member.length)
      //   for(let i in member) {
      //     console.log("value of i is:   ",member[i].uadmid)
      //   }
      // })
    // this.temp = false
    // this.query = this.afs.collection('admins',ref => ref.where('email', '==', this.userEmail)).snapshotChanges()
    // console.log(JSON.parse(this.payloadAd).email)
    // this.temp = await this.aas.getAdmin(this.userEmail)
    // console.log(this.temp)
    // setTimeout(() => {
    //   console.log('waiting over')
    //   console.log(typeof(this.temp), JSON.parse(this.temp).email)
    // }, 3000);
    // console.log('this.temp')
    // if(this.temp==null){
    //   console.log("null")
    // }
    // console.log(typeof(this.temp), JSON.parse(this.temp).email)

  //   for (var mem in this.members) {
  //     console.log(this.members[mem].password)
  // }
  // console.log(this.allAdmins)
  // for(let admin of this.allAdmins) {
  //   console.log(admin.email)
  // }
  }
  async addCities() {
  
const citiesRef = this.afs.collection('cities');

await citiesRef.doc('SF').set({
  name: 'San Francisco', state: 'CA', country: 'USA',
  capital: false, population: 860000,
  regions: ['west_coast', 'norcal']
});
await citiesRef.doc('LA').set({
  name: 'Los Angeles', state: 'CA', country: 'USA',
  capital: false, population: 3900000,
  regions: ['west_coast', 'socal']
});
await citiesRef.doc('DC').set({
  name: 'Washington, D.C.', state: null, country: 'USA',
  capital: true, population: 680000,
  regions: ['east_coast']
});
await citiesRef.doc('TOK').set({
  name: 'Tokyo', state: null, country: 'Japan',
  capital: true, population: 9000000,
  regions: ['kanto', 'honshu']
});
await citiesRef.doc('BJ').set({
  name: 'Beijing', state: null, country: 'China',
  capital: true, population: 21500000,
  regions: ['jingjinji', 'hebei']
});
  }
  allAdmins:any;
  payloadAd:any;
  // profile:Observable <IMember>
  // private profileCollection!: AngularFirestoreCollection<IMember>;
  prof!: Observable<IMember[]>;
  profile
  id
  ngOnInit() {
   this.prof = this.afs.collection<IMember>('members',ref => ref.where('uadmid','==',21091996)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IMember
        const id = a.payload.doc.id
        this.id = id
        return { id, ...data }
      }))
    )
    
        this.prof.forEach(pr=>pr.forEach(profile=>{
          console.log("profile",profile.id)
          this.profile = profile
        }))
        setTimeout(() => {
          console.log("profile id",this.profile.id)
          console.log("only id",this.id)
        }, 3000);
    this.members = this.memberSer.getMember() 
    this.afs.collection('cities').valueChanges().subscribe(city => {
      this.allCity = city
    })
    this.afs.collection('admins',ref => ref.where('id', '==', 2)).snapshotChanges().pipe()
    .subscribe(data => {
      data.forEach(d=> this.payloadAd = JSON.stringify(d.payload.doc.data()))
    });
    
    // const queryRef = citiesRef.where('state', '==', 'CA');
    this.afs.collection('admins').valueChanges().subscribe(data1=>{
      console.log("direct data1: ",data1)
      this.allAdmins = data1
      console.log("data1 allAdmins: ",this.allAdmins)
    })
    console.log("outer allAdmins: ",this.allAdmins)

  }
    
}
