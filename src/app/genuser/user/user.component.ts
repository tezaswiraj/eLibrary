import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AdminMembersService } from 'src/app/adminServices/admin-members.service';
import { RouterModule, Router } from '@angular/router';
import { from } from 'rxjs';
import { IMember } from 'src/app/adminmodule/members/members';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private afs:AngularFirestore, private memberSer: AdminMembersService, private router: Router) { }
  user:any;
  public members = []
  temp
  username:any;
  password:any;
 userSubmit(form: NgForm) {
   this.user = form.value;
   console.log(this.user)
   console.log(this.user.username)
   console.log(this.user.password)
   this.afs.collection('members',ref => ref.where('umail', '==', this.user.username)).snapshotChanges()
     .pipe()
     .subscribe(data => {
       data.forEach( d=> {
         this.temp =  d.payload.doc.data()
         sessionStorage.setItem("userid",d.payload.doc.id)
       })
     });
     console.log(this.temp)
    //  console.log(typeof(this.temp.umail),"umail: ",this.temp.umail)
     setTimeout(() => {
      if(this.temp.umail == this.user.username) {
        if(this.temp.upassword == this.user.password) {
          console.log("Success!!")
          // alert("You have been successfully logged in...");
          //local storage
          sessionStorage.setItem("uadmid", this.temp.uadmid)
          sessionStorage.setItem("userName", this.temp.uname)
          
          this.router.navigate(['user/profile']);
          this.temp = true;
          form.reset();
        }
        else {
          alert("invalid password...")
          this.temp = true
        }
      }
    }, 3000);
    setTimeout(() => {
      if(this.temp == false) {
        alert("Invalid admin id or password")
      }
    }, 3100);
 }
 regSubmit(regform:NgForm){
   console.log(regform.value)
   console.log(regform.value.regemail)
   console.log(regform.value.regpassword)
   console.log(regform.value.reguser)
 }


  ngOnInit() {
    // getAdmin(email:string) {
        console.log("init value",this.temp)
  //  }
    }

}
