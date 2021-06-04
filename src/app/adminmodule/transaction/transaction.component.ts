import { Component, OnInit } from '@angular/core';
import { AdminMembersService } from 'src/app/adminServices/admin-members.service';
import { IMember } from '../members/members';
import { AdminBooksService } from 'src/app/adminServices/admin-books.service';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(private memberSer: AdminMembersService, private bookSer: AdminBooksService, private router:Router) { }
  public reqUsers;
  public recUsers;
  user
  reqBooks;
  recBooks = [];
  recBooks2;

  ngOnInit() {
    this.get();
  }

  get() {
    this.memberSer.getMemReq().subscribe(data => {
      this.reqUsers = data;
      console.log("reqUsers: ",this.reqUsers);
    });
    this.memberSer.getMemRec().subscribe(data2 => {
      this.recUsers = data2
      console.log("recUsers",this.recUsers)
    });
  }

  view(user: IMember) {
    console.log("requested books: ",JSON.parse(user['ureqj']))
    this.reqBooks = JSON.parse(user['ureqj']);
    this.recBooks = JSON.parse(user.urecj);
    this.takeUser(user);
  }

  takeUser(user) {
//     console.log("before user:",user)
    this.user = user
//     console.log("takeUser",this.user)
//     this.memberSer.getMembyId(user.id).subscribe(data => {
//       this.user = data;
//       console.log("data", data)
//       console.log("take user user id: ",this.user);
//     })
  }

  viewAcc(user: IMember) {
    this.recBooks2 = JSON.parse(user.urecj);
  }


  ace(m) {
    let index = this.reqBooks.findIndex(obj => obj.btitle == m.btitle);
    console.log(index);
    this.recBooks.push(this.reqBooks[index]);
    if (this.recBooks.length == 0) {
      this.user.urecstatus = 0;
    } else {
      this.user.urecstatus = 1;
    }
    this.user.urecj = JSON.stringify(this.recBooks);
//     console.log("after entry in received books: ",this.user,this.user.id)
//     this.memberSer.updateMember(this.user,this.user.id)

    this.reqBooks.splice(index, 1);
    this.user.ureqj = JSON.stringify(this.reqBooks);
//     this.memberSer.updateMember(this.user,this.user.id)
//     console.log("updating reqBooks after update in received books",this.user,this.user.id)

    if (this.reqBooks.length == 0 || this.reqBooks.length == null) {
      this.user.ustatus = 0;
    } else {
      this.user.ustatus = 1;
    }
    this.memberSer.updateMember(this.user,this.user.id)
    console.log("final update in ustatus: ",this.user,this.user.id)
  }
  reject(borrow) {
    console.log(borrow.id);
    let index = this.reqBooks.findIndex(obj => obj.btitle == borrow.btitle);
    console.log(index);
    this.reqBooks.splice(index, 1);

    this.user.ureqj = JSON.stringify(this.reqBooks);
    // this.memberSer.updateMember(this.user).subscribe();
    console.log(this.user,this.user.id)

//     let temp;
//     this.bookSer.getBookbyId(borrow.id).subscribe(data => {

      borrow.bcopies += 1;
      console.log("borrow data: ",borrow.bcopies,borrow.id);
      this.bookSer.updateBook(borrow,borrow.id)
//       console.log(temp.id)
//     });


    if (this.reqBooks.length == 0 || this.reqBooks.length == null) {
      this.user.ustatus = 0;
    } else {
      this.user.ustatus = 1;
    }
    this.memberSer.updateMember(this.user,this.user.id)
    console.log("user data: ",this.user,this.user.id)
  }
  returnBooktoLibraryFromUser(user,borrow) {
    let index = this.recBooks2.findIndex(obj => obj.btitle == borrow.btitle);
    this.recBooks2.splice(index, 1);
    console.log("recBooks",this.recBooks2)
    user.urecj = JSON.stringify(this.recBooks2)
    borrow.bcopies = borrow.bcopies + 1
    console.log("borrow update",borrow,borrow.id)
    if (this.recBooks2.length == 0 || this.recBooks2.length == null) {
      user.urecstatus = 0;
    } else {
      user.urecstatus = 1;
    }
    this.bookSer.updateBook(borrow,borrow.id)
    this.memberSer.updateMember(user,user.id)
    setTimeout(()=>{
      alert('updated books and user database successfully')
      this.router.navigate(['admin/books']);
    },3000)
  }

}
