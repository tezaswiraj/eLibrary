"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TestComponent = void 0;
var core_1 = require("@angular/core");
var TestComponent = /** @class */ (function () {
    function TestComponent(memberSer, db, afs, aas, route) {
        this.memberSer = memberSer;
        this.db = db;
        this.afs = afs;
        this.aas = aas;
        this.route = route;
        this.pdfcontainer = false;
        this.src = 'gs://sancreativelibrary.appspot.com/Books/The Angular Firebase Survival Guide - PDF Room.pdf';
        console.log("this.db.list: ", this.db.list('/admins').valueChanges());
    }
    TestComponent.prototype.forfunction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mailCheck;
            var _this = this;
            return __generator(this, function (_a) {
                this.members.forEach(function (member) {
                    member.forEach(function (mem) {
                        console.log(mem.uadmid);
                        console.log("ustatus:  ", mem.ustatus);
                        console.log(mem.id, typeof (mem.id));
                        if (mem.uadmid == _this.userEmail) {
                            mailCheck = false;
                            console.log("already exist");
                        }
                    });
                });
                setTimeout(function () { return console.log(mailCheck); }, 900);
                return [2 /*return*/];
            });
        });
    };
    TestComponent.prototype.addCities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var citiesRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        citiesRef = this.afs.collection('cities');
                        return [4 /*yield*/, citiesRef.doc('SF').set({
                                name: 'San Francisco', state: 'CA', country: 'USA',
                                capital: false, population: 860000,
                                regions: ['west_coast', 'norcal']
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, citiesRef.doc('LA').set({
                                name: 'Los Angeles', state: 'CA', country: 'USA',
                                capital: false, population: 3900000,
                                regions: ['west_coast', 'socal']
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, citiesRef.doc('DC').set({
                                name: 'Washington, D.C.', state: null, country: 'USA',
                                capital: true, population: 680000,
                                regions: ['east_coast']
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, citiesRef.doc('TOK').set({
                                name: 'Tokyo', state: null, country: 'Japan',
                                capital: true, population: 9000000,
                                regions: ['kanto', 'honshu']
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, citiesRef.doc('BJ').set({
                                name: 'Beijing', state: null, country: 'China',
                                capital: true, population: 21500000,
                                regions: ['jingjinji', 'hebei']
                            })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestComponent.prototype.viewPdf = function () {
        this.pdfcontainer = true;
    };
    TestComponent.prototype.ngOnInit = function () {
        this.afs.collection('members').doc(sessionStorage.getItem('userid')).valueChanges().forEach(function (data) { return console.log("data", data.uname); });
        // console.log("doctemp",doctemp)
        //  this.prof = this.afs.collection<IMember>('members',ref => ref.where('uadmid','==',21091996)).snapshotChanges().pipe(
        //     map(actions => actions.map(a => {
        //       const data = a.payload.doc.data() as IMember
        //       const id = a.payload.doc.id
        //       this.id = id
        //       return { id, ...data }
        //     }))
        //   )
        //       this.prof.forEach(pr=>pr.forEach(profile=>{
        //         console.log("profile",profile.id)
        //         this.profile = profile
        //       }))
        //       setTimeout(() => {
        //         console.log("profile id",this.profile.id)
        //         console.log("only id",this.id)
        //       }, 3000);
        // this.members = this.memberSer.getMember() 
        // this.afs.collection('cities').valueChanges().subscribe(city => {
        //   this.allCity = city
        // })
        // this.afs.collection('admins',ref => ref.where('id', '==', 2)).snapshotChanges().pipe()
        // .subscribe(data => {
        //   data.forEach(d=> this.payloadAd = JSON.stringify(d.payload.doc.data()))
        // });
        // const queryRef = citiesRef.where('state', '==', 'CA');
        // this.afs.collection('admins').valueChanges().subscribe(data1=>{
        //   console.log("direct data1: ",data1)
        //   this.allAdmins = data1
        //   console.log("data1 allAdmins: ",this.allAdmins)
        // })
        // console.log("outer allAdmins: ",this.allAdmins)
    };
    TestComponent = __decorate([
        core_1.Component({
            selector: 'app-test',
            templateUrl: './test.component.html',
            styleUrls: ['./test.component.css']
        })
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;
