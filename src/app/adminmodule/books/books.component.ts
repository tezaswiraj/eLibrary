import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminBooksService } from 'src/app/adminServices/admin-books.service';
import { IBook } from './books';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private fb: FormBuilder, public bookSer: AdminBooksService, private fbd: FormBuilder) { }
  books!: Observable<IBook[]>;
  adminBooksUp:FormGroup;
  adminBooks:FormGroup;
  bookSearch:any;
  onSubmit() {
    let cnf = confirm("Press Ok to save the form..");
    if (cnf == true) {
      /*post method calling*/
      this.bookSer.putBook(this.adminBooks.value)
      this.adminBooks.reset();
    } else { }
  }

  filterStatus = "All";

  getbyStatus(fil: string) {
    console.log(fil);
    this.books = this.bookSer.getBookbyStatus(fil)
  }
  get() {
    this.books = this.bookSer.getBook()
  }

  bookStatus(st) {
    this.filterStatus = st;
    console.log(this.filterStatus);
    if (this.filterStatus == "All") {
      console.log("ifffff")
      this.get();
    }
    else {
      console.log("elseee")
      this.getbyStatus(this.filterStatus);
    }

  }

  delete(id: any) {
    console.log(id);
    let cnf = confirm("Press Ok to delete the book..");
    if (cnf == true) {
      this.bookSer.deleteBook(id)
    }
    else { }
  }

  OnUpdate() {
    console.log("update id:  ",this.bookSer.currentBook.id);
    const updateId = this.bookSer.currentBook.id
        /*logic for to add member details*/
        let cnf = confirm("Press Ok to update the book..");
        if (cnf == true) {
          console.log(this.bookSer.currentBook,updateId)
          this.bookSer.updateBook(this.bookSer.currentBook,updateId);
        }
        else { }      
  }

  edit(book: IBook) {
    this.bookSer.currentBook = Object.assign({}, book)
    console.log("onEdit:    ",this.bookSer.currentBook)
  }


  ngOnInit() {
    console.log('false')
    // this.wholeGet();
    this.bookStatus(this.filterStatus);

    this.adminBooks = this.fb.group({
      btitle: ['', [Validators.required, Validators.minLength(5)]],
      bcatag: ['', [Validators.required,]],
      bstatus: ['', [Validators.required,]],
      bcopies: ['', [Validators.required, Validators.min(1)]],
      bisbn: ['', [Validators.required,]],
      byear: ['', [Validators.required, Validators.min(1200), Validators.max(2020)]],
      bauthor: [''],
      bpub: [''],
      pubname: [''],
      bdate: ['']
    })

    this.adminBooksUp = this.fbd.group({
      btitle: ['', [Validators.required, Validators.minLength(5)]],
      bcatag: ['', [Validators.required,]],
      bstatus: ['', [Validators.required,]],
      bcopies: ['', [Validators.required, Validators.min(1)]],
      bisbn: ['', [Validators.required,]],
      byear: ['', [Validators.required, Validators.min(1200), Validators.max(2020)]],
      bauthor: [''],
      bpub: [''],
      pubname: [''],
      bdate: ['']
    })
  }
}
