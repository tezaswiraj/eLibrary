import { Component, OnInit } from '@angular/core';
import { AdminBooksService } from 'src/app/adminServices/admin-books.service';
import { IMember } from 'src/app/adminmodule/members/members';
import { UserOwnedService } from 'src/app/userServices/user-owned.service';
import { IBook } from 'src/app/adminmodule/books/books';
import { AdminMembersService } from 'src/app/adminServices/admin-members.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  constructor(private bookSer: AdminBooksService, private userDet: UserOwnedService, private memberSer: AdminMembersService, ) {

  }
  ngAfterViewInit() {


  }
  bookSearch
  user;
  dodge;
  badge;
  public requestedBooks = [];
  public recievedBooks = [];
  userid;
  public books:Observable<IBook[]>;

  rec() {
    this.recievedBooks = JSON.parse(this.user.urecj);

    if (this.recievedBooks.length == null || this.recievedBooks.length == 0) {
      this.dodge = null;
    }
    else if (this.recievedBooks.length != 0) {
      this.dodge = this.recievedBooks.length;
    }
  }
  ngOnInit() {

    console.log(this.badge)
    // this.getbyStatus("Old&bstatus=New&bstatus=Damaged");
    if (sessionStorage) {
      this.userid = sessionStorage.getItem("userid");
      if (this.userid != null) { }
    }
    this.books = this.bookSer.getBook()
    this.memberSer.getMembyId(this.userid).forEach(
      data => {
        this.user = data
        console.log("value of this.user:  ",this.user);
        // console.log("value of name:  ",this.user.uname);
        this.rec();
        this.requestedBooks = JSON.parse(this.user.ureqj);
//         this.requestedBooks = this.user.ureqj;

        if (this.requestedBooks.length == null || this.requestedBooks.length == 0) {
          this.badge = null;
        }
        else if (this.requestedBooks.length != 0) {
          this.badge = this.requestedBooks.length;
        }
      }
    );
  }

  //2222
  // jsonSet() {
  //   // this.user.ureqj = JSON.stringify(this.requestedBooks);
  //   this.requestedBooks = JSON.parse(this.user.ureqj);
  //   // this.requestedBooks = obj
  //   this.badge = this.requestedBooks.length;
  // }

  getbyStatus(fil: string) {
    console.log(fil);
    this.books = this.bookSer.getBookbyStatus(fil)
      // .subscribe(data => this.books = data);
  }



  addtoReq(book: IBook) {
    // console.log("addtoReq:  ",book.bcopies)
    if (book.bcopies > 0) {
      if (this.requestedBooks == null) {
        console.log("no requested books")

        this.requestedBooks = this.requestedBooks || [];
        this.requestedBooks.push(book);
        this.reqSave();
        // localStorage.setItem("user" + this.userid + "", JSON.stringify(this.requestedBooks));
        book.bcopies -= 1;
//         console.log(book,book.id)
        this.bookSer.updateBook(book,book.id)
      }
      else {
//         console.log("moonji");
        if ((this.requestedBooks.length + this.recievedBooks.length) < 3 || (this.requestedBooks.length + this.recievedBooks.length) == null) {
          this.requestedBooks.push(book);
          this.reqSave();
          // localStorage.setItem("user" + this.userid + "", JSON.stringify(this.requestedBooks));
          book.bcopies -= 1;
          console.log(book,book.id)
          this.bookSer.updateBook(book,book.id)

        } else {
          alert("You can not take more than 3 books...")
        }
      }
      // this.badge = this.requestedBooks.length;
    }
    else {
      if (book.bcopies == 0) {
        alert("Book is not available now..")
      }
      else {
        alert("You cant take more than 3 books")
      }
    }
  }
  tempDelfrmReq:''
  delfrmReq(borrow) {
    let index = this.requestedBooks.map(obj => {
      if(obj.btitle == borrow.btitle) {
//         console.log(obj.btitle,borrow.btitle)
//         console.log("both are equal")
        this.tempDelfrmReq = obj.btitle
      }
      return obj.btitle
    }).indexOf(this.tempDelfrmReq);

//     console.log("index: ",index);
//     console.log("this.requestedBooks",this.requestedBooks[index])
    this.requestedBooks.splice(index, 1);
    this.badge = this.requestedBooks.length;
    this.reqSave();
    // localStorage.setItem("user" + this.userid + "", JSON.stringify(this.requestedBooks));
  let tempcp;
    this.books.forEach(ele => ele.forEach(element =>{
//       console.log("element.id",element.id)
//       console.log("borrow.id",borrow.id)
//       console.log("eb",element.bcopies)
      if (borrow.id == element.id) {
// 	console.log("element copies",element.bcopies)
        tempcp = element.bcopies;
// 	console.log(typeof(tempcp),typeof(element.bcopies))
      }
    }));

    setTimeout(()=>{
//     console.log("tempcp",tempcp);
    tempcp += 1;
    borrow.bcopies = tempcp;
//     console.log("borrow.bcopies",borrow.bcopies)
//     console.log("borrow",borrow,borrow.id)
    this.bookSer.updateBook(borrow,borrow.id)
    },1000)

  }
  //333333
//   delsave() {
//     this.user.ustatus = 1;
//     this.user.ureqj = JSON.stringify(this.requestedBooks);
//     this.memberSer.updateMember(this.user,this.userid)
//     console.log(this.user);
//     this.badge = this.requestedBooks.length;
//   }

  reqSave() {
    console.log("in req save",this.requestedBooks)
    if (this.requestedBooks.length == 0) {
      this.user.ustatus = 0;
    } else {
      this.user.ustatus = 1;
    }
//     this.user.ureqj = this.requestedBooks;
    this.user.ureqj = JSON.stringify(this.requestedBooks);
    console.log("after ureqj: ",this.user)
    this.memberSer.updateMember(this.user,this.userid);
    this.badge = this.requestedBooks.length;
  }
  recSave() {
    if (this.recievedBooks.length == 0) {
      this.user.urecstatus = 0;
    } else {
      this.user.urecstatus = 1;
    }
    this.user.urecj = JSON.stringify(this.recievedBooks);
    this.memberSer.updateMember(this.user,this.user.id);
  }
  delfrmRec(borrow) {
    let index = this.recievedBooks.findIndex(obj => obj.btitle == borrow.btitle);
    console.log(index);
    this.recievedBooks.splice(index, 1);
    this.recSave();

    let tempcp;
    this.books.forEach(ele => ele.forEach(element=> {
      console.log(borrow.id,element.id,"in delfrmRec",element.bcopies)
      if (borrow.id == element.id) {
        tempcp = element.bcopies;
      }
    }));

    setTimeout(() => {
      console.log(tempcp);
    tempcp += 1;
    borrow.bcopies = tempcp;
    console.log("borrow copies",borrow.bcopies)
    this.bookSer.updateBook(borrow,borrow.id)

    }, 1000);
  }

}
