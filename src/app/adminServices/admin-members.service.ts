import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IMember } from '../adminmodule/members/members';
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class AdminMembersService {

  authState:any = null
  constructor(private afs: AngularFirestore,private afu:AngularFireAuth) {
    this.afu.authState.subscribe((auth => {
        this.authState = auth
    }))
  }
  private memberCollection!: AngularFirestoreCollection<IMember>;
  members!: Observable<IMember[]>;

  getMember(): Observable<IMember[]> {
    this.memberCollection = this.afs.collection<IMember>('members')
    this.members = this.memberCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IMember;
        const id = a.payload.doc.id
        return { id, ...data }
      }))
    )
    return this.members
  }

  reqMembersCollection!: AngularFirestoreCollection<IMember>
  reqMembers!: Observable<IMember[]>;
  getMemReq():Observable<IMember[]> {
    // return this.http.get<IMember[]>(this.urlMember + '?ustatus=1');
    this.reqMembersCollection = this.afs.collection<IMember>('members',ref => ref.where('ustatus', '==', 1))
    this.reqMembers = this.reqMembersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
      const data = a.payload.doc.data() as IMember;
      const id = a.payload.doc.id
      return { id, ...data }
    })))
    return this.reqMembers
  }

  putMember(member: IMember) {
    console.log("putMemberStart:  ",member,member.umail,member.upassword,"putMemberEnd")
    this.afs.collection('members').add(member)
  }

  deleteMember(id: string) {
    this.afs.doc('members/' + id).delete();
  }
  updateMember(member: IMember,id) {
    this.afs.doc('members/' + id).update(member)
  }

  getMembyId(id: any) {
    // return this.http.get<IMember>(this.urlMember + '/' + id);
    // this.afs.collection<IMember>('members').doc(sessionStorage.getItem('userid')).valueChanges().forEach(data=>console.log("data",data.uname))
    return this.afs.collection<IMember>('members').doc(id).valueChanges()
  }

  updateMemSt1(member: IMember) {
    member.ustatus = 1;
    console.log("update ustatus:  ",member,member.ustatus)
    // return this.http.put<IMember>(this.urlMember + '/' + member.id, member);
    this.afs.doc('members/' + member.id).update(member.ustatus=1);
  }

  getMemRec():Observable<IMember[]> {
    // return this.http.get<IMember[]>(this.urlMember + '?urecstatus=1');
   return this.afs.collection<IMember>('members',ref => ref.where('urecstatus', '==', 1)).valueChanges()
    // .subscribe(data => data.forEach(d=> {
      // console.log(d)
    // }))
  }
  registerWithEmail(email:string,password:string) {
   return this.afu.createUserWithEmailAndPassword(email,password).then(user=>{
      this.authState = user
    }).catch(error=>{
      console.log(error)
      throw error
    })
  }

  currentMember: IMember = {
    id: -1,
    uname: '',
    uadmid: -1,
    umail: '',
    udep: '',
    upassword: '',
    ustatus: -1,
    urecstatus: -1,
    ureqj: '',
    urecj: ''

    // uborrow: [null],
    // uowned: [null],

  }

}
