import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminBooksService } from 'src/app/adminServices/admin-books.service';
import { AdminMembersService } from 'src/app/adminServices/admin-members.service';
import { IMember } from './members';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  error: any;
  message: string;
  currentField: any;

  constructor(private fb: FormBuilder, public memberSer: AdminMembersService, private fbd: FormBuilder,private afs:AngularFirestore) { }
  
  members!: Observable<IMember[]>;
  // public members: IMember[] = [];
  adminMembers:FormGroup;
  allMembers:FormGroup;
  adminMembersUp;
  temp;
  update(member: IMember,id:any) {
    this.memberSer.updateMember(member,id)
  }

  get() {
    this.members = this.memberSer.getMember()    
  }

  put() {
    this.temp = this.adminMembers.value;
    this.temp.ustatus = 0;
    this.temp.urecstatus = 0;
    this.temp.urecj = '[]';
    this.temp.ureqj = '[]';
    this.memberSer.putMember(this.temp)
  }

  delete(id: any) {
    console.log(id);
    let cnf = confirm("Press Ok to delete the user..");
    if (cnf == true) {
      this.memberSer.deleteMember(id)
    }
  }

  edit(member: IMember) {
    this.memberSer.currentMember = Object.assign({}, member)
    console.log(this.memberSer.currentMember)
  }

  
  onSubmit() {
    /*Checking email and admission id is already exist*/
    let mailCheck: Boolean;
    let admidCheck: Boolean;
    this.members.forEach(mem => {
      mem.forEach(member=>{
        if (member.umail == this.adminMembers.value.umail) {
          mailCheck = false;
        } else { }
        if (member.uadmid == this.adminMembers.value.uadmid) {
          admidCheck = false;
          console.log(admidCheck);
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
      
        setTimeout(() => {
          if(mailCheck != false && admidCheck != false){
            // this.afs.collection('members').add(this.adminMembers.value)
            let cnf = confirm("Press Ok to save the form..");
            console.log("values:  ",this.adminMembers.value)
            if (cnf == true) {
              this.put();
              this.memberSer.registerWithEmail(this.adminMembers.value.umail,this.adminMembers.value.upassword).then(()=>{
                this.message = "Member successfully added"
                console.log(this.message)
              }).catch(_error => {
                  this.error = _error
                  console.log(_error)
                })
             this.adminMembers.reset();
      } else {
      }            
    }
  }, 930);

      /*logic for to add member details*/
      setTimeout(() => {
        
      }, 920);
  }
  ngOnInit() {
    this.get();

    this.adminMembers = this.fb.group({
      uname: ['', [Validators.required, Validators.minLength(5)]],
      uadmid: ['', [Validators.required, Validators.minLength(5)]],
      umail: ['', [Validators.required, Validators.email]],
      udep: ['', [Validators.required]],
      upassword: ['', [Validators.required, Validators.minLength(8),]],

    })
    
    this.adminMembers.valueChanges.subscribe(console.log)
    this.adminMembers.valueChanges.subscribe(val=>{
      this.currentField = val
    })
    
    console.log(this.currentField)

    this.adminMembersUp = this.fbd.group({
      uname: ['', [Validators.required, Validators.minLength(5)]],
      uadmid: ['', [Validators.required, Validators.minLength(5)]],
      umail: ['', [Validators.required, Validators.email]],
      udep: ['', [Validators.required]],
      upassword: ['', [Validators.required, Validators.minLength(8),]],
    })
  }

  OnUpdate() {
    console.log("update id:  ",this.memberSer.currentMember.id);
    const updateId = this.memberSer.currentMember.id
        /*logic for to add member details*/
        let cnf = confirm("Press Ok to update the user..");
        if (cnf == true) {
          console.log(this.memberSer.currentMember,updateId)
          this.update(this.memberSer.currentMember,updateId);
        }
        else { }      
    }
  }

