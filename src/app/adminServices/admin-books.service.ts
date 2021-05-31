import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../adminmodule/books/books';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminBooksService {

  private bookCollection!: AngularFirestoreCollection<IBook>;
  books!: Observable<IBook[]>;

  constructor(private afs: AngularFirestore) { }

  getBook(): Observable<IBook[]> {
    this.bookCollection = this.afs.collection<IBook>('books')
    this.books = this.bookCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IBook;
        const id = a.payload.doc.id
        return { id, ...data }
      }))
    )
    return this.books
  }

  getBookbyStatus(fil: string): Observable<IBook[]> {
    return this.afs.collection<IBook>('books',ref => ref.where('bstatus','==',fil)).valueChanges()
  }

  getBookbyId(id: string): Observable<IBook[]> {
    return this.afs.collection<IBook>('books',ref => ref.where('id','==',id)).valueChanges()
  }

  putBook(book: IBook) {
    this.afs.collection('books').add(book)
  }
  deleteBook(id: any) {
    this.afs.doc('books/' + id).delete();
  }
  updateBook(book: IBook,id:any) {
    this.afs.doc('books/' + id).update(book) 
  }

  currentBook: IBook = {
    id: null,
    bid:null,
    btitle: '',
    bcatag: '',
    bauthor: '',
    bcopies: null,
    bpub: '',
    pubname: '',
    bisbn: '',
    byear: null,
    bdate: null,
    bstatus: '',
  }

}
