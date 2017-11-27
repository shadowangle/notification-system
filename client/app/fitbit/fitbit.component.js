"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("../_services/index");
var FitbitComponent = (function () {
    function FitbitComponent(router, alertService, userService) {
        this.router = router;
        this.alertService = alertService;
        this.userService = userService;
        this.users = [];
        this.model = {};
        this.loading = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    FitbitComponent.prototype.Fever = function () {
        var _this = this;
        this.currentUser.Status = 'Fever';
        this.userService.update(this.currentUser._id, this.currentUser)
            .subscribe(function (data) {
            var data = data;
            _this.alertService.success('Successful to update Status', true);
            _this.router.navigate(['']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        }, function () {
            localStorage.setItem('currentUser', JSON.stringify(_this.currentUser));
            _this.sendMail();
        });
    };
    FitbitComponent.prototype.Bleeding = function () {
        var _this = this;
        this.currentUser.Status = 'bleeding';
        this.userService.update(this.currentUser._id, this.currentUser)
            .subscribe(function (data) {
            var data = data;
            _this.alertService.success('Successful to update Status', true);
            _this.router.navigate(['']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        }, function () {
            localStorage.setItem('currentUser', JSON.stringify(_this.currentUser));
            _this.sendMail();
        });
    };
    FitbitComponent.prototype.Lackofwater = function () {
        var _this = this;
        this.currentUser.Status = 'lackofwater';
        this.userService.update(this.currentUser._id, this.currentUser)
            .subscribe(function (data) {
            var data = data;
            _this.alertService.success('Successful to update Status', true);
            _this.router.navigate(['']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        }, function () {
            localStorage.setItem('currentUser', JSON.stringify(_this.currentUser));
            _this.sendMail();
        });
    };
    FitbitComponent.prototype.Heartdisease = function () {
        var _this = this;
        this.currentUser.Status = 'heartdisease';
        this.userService.update(this.currentUser._id, this.currentUser)
            .subscribe(function (data) {
            var data = data;
            _this.alertService.success('Successful to update Status', true);
            _this.router.navigate(['']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        }, function () {
            localStorage.setItem('currentUser', JSON.stringify(_this.currentUser));
            _this.sendMail();
        });
    };
    FitbitComponent.prototype.Normal = function () {
        var _this = this;
        this.currentUser.Status = 'normal';
        this.userService.update(this.currentUser._id, this.currentUser)
            .subscribe(function (data) {
            var data = data;
            _this.alertService.success('Successful to update Status', true);
            _this.router.navigate(['']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        }, function () {
            localStorage.setItem('currentUser', JSON.stringify(_this.currentUser));
            _this.sendMail();
        });
    };
    FitbitComponent.prototype.sendMail = function () {
        var _this = this;
        this.loading = true;
        this.userService.sendMail(this.currentUser)
            .subscribe(function (data) {
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    FitbitComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'fitbit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, index_1.AlertService, index_1.UserService])
    ], FitbitComponent);
    return FitbitComponent;
}());
exports.FitbitComponent = FitbitComponent;
//# sourceMappingURL=fitbit.component.js.map