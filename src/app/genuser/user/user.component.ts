import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 
  constructor() { }
  user:any;
  username:any;
  password:any;
 userSubmit(form: NgForm) {
   this.user = form.value;
   console.log(this.user)
   console.log(this.user.username)
   console.log(this.user.password)
   
 }
 regSubmit(regform:NgForm){
   console.log(regform.value)
   console.log(regform.value.regemail)
   console.log(regform.value.regpassword)
   console.log(regform.value.reguser)
 }
 

  ngOnInit() {

    }

}
