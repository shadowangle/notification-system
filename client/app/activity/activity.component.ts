import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { UserService, AlertService } from '../_services/index';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { ChartsModule } from 'ng2-charts';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
  moduleId: module.id,
  templateUrl: 'activity.component.html'
})

export class ActivityComponent {
  currentUser: User;
  users: User[] = [];
  model: any = {};
  loading = false;
  data1: any = {};
  welcome : string;
  googleapis : string;
  constructor(private router: Router, private alertService: AlertService, private userService: UserService) {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    for (let a of this.currentUser.fitbitInfor){
        this.barChartLabels.push(a.time);
        this.heartrate.push(a.value);
    }
    
  }
 
  timeout() {
    setTimeout(() => {
      window.location.href='http://localhost:4000/auth/fitbit/callback';
        this.timeout();
    }, 120000);
}
sendMail() {
  this.loading = true;

  this.userService.sendMail(this.currentUser)
      .subscribe(
      data => {

      },
      error => {
          this.alertService.error(error);
          this.loading = false;
      });
}
  ngOnInit() {
    this.loadUserById()
    this.timeout()
    this.sendMail()
  }

  loadUserById() {
    this.userService.getById(this.currentUser._id).subscribe
      (
      users => {
        this.currentUser.fitbitInfor = users.fitbitInfor;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        this.googleapis = users.googleapis;
        console.log(this.googleapis)
        if (users.fitbitInfor.length == 0 || users.fitbitInfor == null)
        {
          this.welcome = "You doesn't connect fitbit account to the system or today you doesn't wear device."
        }
        // console.log(this.barChartLabels);
        console.log(this.heartrate);
        console.log(users.fitbitInfor)
      },
      error => {
          this.alertService.error(error);
          this.loading = false;
      },
  () => {
      
  });
  }

 
  public lineChartColors:Array<any> = [
    { 
      backgroundColor: 'transparent',
      borderColor: '#e53935',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointHoverBorderColor: 'transparent'
    }]

  public heartrate: any[] = [];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    pointBorder: false 
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'line';
  public barChartLegend: boolean = true;

  public barChartData: any[] =
  [{ data: this.heartrate, label: 'Heartrate' }

  ];
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
