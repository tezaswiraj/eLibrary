import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminAuthService } from 'src/app/adminServices/admin-auth.service';
import { Event, Router, NavigationStart, NavigationEnd,NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showLoadingIndicator:Boolean

  constructor(private aas:AdminAuthService,private router:Router, private afs:AngularFirestore) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true
      }
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError ) {
        this.showLoadingIndicator = false
      }

    })
   }
  admin:any
  adminname:any
  password:any
  temp!:boolean
  LoginAdmin:any;
  allAdmin

  adminSubmit(form: NgForm) {
    this.showLoadingIndicator = true
    this.admin = form.value;
    console.log(this.admin.adminname);
    console.log(this.admin.password);
    this.temp = false;

    setTimeout(()=>{
      // console.log("aS",this.allAdmin)
      this.getLogAdmin(form.value.adminname)
      try {
        if (this.LoginAdmin.email == this.admin.adminname) {
          if (this.LoginAdmin.password == this.admin.password) {
            console.log("Success!!");
            alert("You have been successfully logged in...");          
            sessionStorage.setItem("adminid", this.LoginAdmin.id);
            sessionStorage.setItem("adminName", this.LoginAdmin.name);
            this.router.navigate(['admin/books']);
            this.temp = true;
            form.reset();  
          }
          else {
            this.showLoadingIndicator = false
            alert("Invalid password...");            
            this.temp = true;
          }
        }
      } catch (error) {
        console.log(error)
        this.showLoadingIndicator = false
        alert("invalid email id or password")
        form.reset();
      }
      // else {
      //         }
      // if (this.temp == false) {
      //   alert("Invalid admin id or password...");    
      // }

    },3000)
    
}
  getLogAdmin(femail){
    // console.log("pissed",femail)
    this.allAdmin.forEach(l=>{
      // console.log("value of: ",l.email,typeof(l.email))
      if(l.email == femail) {
        // console.log('llllll',l)
          this.LoginAdmin = l
          // console.log('tempAd',this.LoginAdmin)
      }
    })
  }
    tempAd:any;
    ngOnInit() {
     this.afs.collection('admins').valueChanges().subscribe(data=>{
	   this.allAdmin = data		
     })
     setTimeout(() => {
       console.log("ng oninit",this.allAdmin)
     }, 2900);
 }
}

  
