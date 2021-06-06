"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminAuthService = void 0;
var core_1 = require("@angular/core");
var AdminAuthService = /** @class */ (function () {
    function AdminAuthService(afs) {
        this.afs = afs;
    }
    AdminAuthService.prototype.getAdmin = function (email) {
        var _this = this;
        this.afs.collection('admins', function (ref) { return ref.where('email', '==', email); }).snapshotChanges()
            .pipe()
            .subscribe(function (data) {
            data.forEach(function (d) {
                _this.temp = (d.payload.doc.data());
            });
        });
        return this.temp;
    };
    AdminAuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AdminAuthService);
    return AdminAuthService;
}());
exports.AdminAuthService = AdminAuthService;
