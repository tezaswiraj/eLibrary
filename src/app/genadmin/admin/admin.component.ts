import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminAuthService } from 'src/app/adminServices/admin-auth.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private aas:AdminAuthService,private router:Router) { }
  admin:any
  adminname:any
  password:any
  temp!:boolean
  LoginAdmin:any;
  adminSubmit(form: NgForm) {
    this.admin = form.value;
    console.log(this.admin.adminname);
    console.log(this.admin.password);
    this.LoginAdmin = this.aas.getAdmin(this.admin.adminname)
    this.LoginAdmin =  JSON.stringify(this.LoginAdmin)
    this.LoginAdmin =  JSON.parse(this.LoginAdmin)
    console.log(typeof(this.LoginAdmin),this.LoginAdmin)
    console.log(this.LoginAdmin.email)
    this.temp = false;
        if (this.LoginAdmin.email == this.admin.adminname) {
          if (this.LoginAdmin.password == this.admin.password) {
            console.log("Success!!");
            alert("You have been successfully logged in...");  
            //local storage
           
            sessionStorage.setItem("adminid", this.LoginAdmin.id);
            sessionStorage.setItem("adminName", this.LoginAdmin.name);

            this.router.navigate(['admin/books']);
            this.temp = true;
            form.reset();  
          }
          else {
            alert("Invalid password...");            
            this.temp = true;
          }
        }
        else {
          // form.reset();
        }

        if (this.temp == false) {
          alert("Invalid admin id or password...");    
        }
    }
    ngOnInit() { }

  }

  

