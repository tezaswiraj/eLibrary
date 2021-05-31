import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/adminmodule/members/members';
import { UserOwnedService } from 'src/app/userServices/user-owned.service';
import { AdminMembersService } from 'src/app/adminServices/admin-members.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile;
  userid;
  adminMembersUp;
  members!: Observable<IMember[]>;
  constructor(private userDet: UserOwnedService, public memberSer: AdminMembersService, private fbd: FormBuilder,private afs:AngularFirestore ) { }

  ngOnInit() {
    //local storage
    if (sessionStorage) {
      this.userid = sessionStorage.getItem("uadmid");
      if (this.userid != null) { }
    }
    console.log("user id in nginit: ",this.userid)
    // this.getUser();
    this.get(this.userid);

    setTimeout(() => {
      console.log("ngOninit:  ",this.userProfile);
    }, 900);
    
    this.getMember();

    this.afs.collection<IMember>('members',ref => ref.where('uadmid','==',21091996)).valueChanges().subscribe(data => {
      console.log(data)
      // data.forEach(d=>console.log(typeof(d.uadmid)))
    })


    this.adminMembersUp = this.fbd.group({
      uname: ['', [Validators.required, Validators.minLength(5)]],
      uadmid: ['', [Validators.required, Validators.minLength(5)]],
      umail: ['', [Validators.required, Validators.email]],
      udep: ['', [Validators.required]],
      upassword: ['', [Validators.required, Validators.minLength(8),]],
    })
  }



  get(userid) {
    console.log('in get after init',  parseInt(userid))
    this.afs.collection<IMember>('members',ref => ref.where('uadmid','==',parseInt(userid))).valueChanges().subscribe(data => {
      console.log("value of data: ",data)
      data.forEach(d=>this.userProfile = d)
    })
       console.log("profileComponent:  ",this.userProfile)
      //  console.log("    :profileMail:  ",this.userProfile.umail)
  }

  edit(member: IMember) {
    console.log("in edit",member)
    this.memberSer.currentMember = Object.assign({}, member)
  }

  update(member: IMember) {
    console.log("in update after called from Onupdate:   ",member,member.id)
    // this.memberSer.updateMember(member,member.id)
  }

  getMember() {
    this.members = this.memberSer.getMember()
    setTimeout(() => {
      this.members.forEach(mem=>{
        console.log("value of mem:  ",mem)
        mem.forEach(member=>console.log("value of member",member))
      })
    }, 1000);
  }

  OnUpdate(currentMember) {
    console.log(currentMember.uadmid);
    if (currentMember.uadmid != null) {
      console.log("Update!!");

      let mailCheck: Boolean;
      let admidCheck: Boolean;
      this.members.forEach(mem => {
        mem.forEach(member => {
        console.log(currentMember.umail)
        console.log(member.umail)
        if (member.umail == currentMember.umail) {
          mailCheck = false;
        } else { }
        if (member.uadmid == currentMember.uadmid) {
          admidCheck = false;
        } else { }
        })
      })

      setTimeout(() => {
        if (mailCheck == false || admidCheck == false) {
          if (mailCheck == false && admidCheck == false) {
            alert("Email id and admission id are already existing...");
          }
          else if (admidCheck == false) {
            alert("Admission id is already existing...");
          }
          else {
            alert("Email id is already existing...");
          }
        }
      }, 900);

        /*logic for to add member details*/
        setTimeout(() => {
          if(mailCheck != false && admidCheck != false) {
            let cnf = confirm("Press Ok to change your details..");
            if (cnf == true) {
              this.update(currentMember);
            }
            else { }
          }
        }, 930);
    }
  }
}
