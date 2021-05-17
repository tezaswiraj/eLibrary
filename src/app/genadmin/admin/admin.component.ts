import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }
  admin:any
  adminname:any
  password:any
  adminSubmit(form: NgForm) {
    this.admin=form.value
    console.log(this.admin)
    console.log(this.admin.adminname)
    console.log(this.admin.password)
  }

  ngOnInit(): void {
  }

}
