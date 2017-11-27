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
var ActivityComponent = (function () {
    function ActivityComponent(router, alertService, userService) {
        this.router = router;
        this.alertService = alertService;
        this.userService = userService;
        this.users = [];
        this.model = {};
        this.loading = false;
        this.data1 = {};
        this.lineChartColors = [
            {
                backgroundColor: 'transparent',
                borderColor: '#e53935',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: 'transparent',
                pointHoverBorderColor: 'transparent'
            }
        ];
        this.heartrate = [];
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            pointBorder: false
        };
        this.barChartLabels = [];
        this.barChartType = 'line';
        this.barChartLegend = true;
        this.barChartData = [{ data: this.heartrate, label: 'Heartrate' }
        ];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        for (var _i = 0, _a = this.currentUser.fitbitInfor; _i < _a.length; _i++) {
            var a = _a[_i];
            this.barChartLabels.push(a.time);
            this.heartrate.push(a.value);
        }
    }
    ActivityComponent.prototype.timeout = function () {
        var _this = this;
        setTimeout(function () {
            window.location.href = 'http://localhost:4000/auth/fitbit/callback';
            _this.timeout();
        }, 120000);
    };
    ActivityComponent.prototype.sendMail = function () {
        var _this = this;
        this.loading = true;
        this.userService.sendMail(this.currentUser)
            .subscribe(function (data) {
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    ActivityComponent.prototype.ngOnInit = function () {
        this.loadUserById();
        this.timeout();
        this.sendMail();
    };
    ActivityComponent.prototype.loadUserById = function () {
        var _this = this;
        this.userService.getById(this.currentUser._id).subscribe(function (users) {
            _this.currentUser.fitbitInfor = users.fitbitInfor;
            localStorage.setItem('currentUser', JSON.stringify(_this.currentUser));
            _this.googleapis = users.googleapis;
            console.log(_this.googleapis);
            if (users.fitbitInfor.length == 0 || users.fitbitInfor == null) {
                _this.welcome = "You doesn't connect fitbit account to the system or today you doesn't wear device.";
            }
            // console.log(this.barChartLabels);
            console.log(_this.heartrate);
            console.log(users.fitbitInfor);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        }, function () {
        });
    };
    // events
    ActivityComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ActivityComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ActivityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'activity.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, index_1.AlertService, index_1.UserService])
    ], ActivityComponent);
    return ActivityComponent;
}());
exports.ActivityComponent = ActivityComponent;
//# sourceMappingURL=activity.component.js.map