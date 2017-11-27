import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { UserService, AlertService } from '../_services/index';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
  
    loading = false;
    users: User[] = [];
    model: any = {};

    constructor(private router: Router, private alertService: AlertService, private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     
    }


    ngOnInit() {
        this.loadUserById()
        this.loadAllUsers();
        // this.sendMail();
        console.log(this.currentUser)
        
    }


    Fever() {
        this.currentUser.Status = 'Fever';
        this.userService.update(this.currentUser._id,this.currentUser)
            .subscribe(
            data => {
                var data = data;
                this.alertService.success('Successful to update Status', true);
                this.router.navigate(['']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            },
            () => {
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                
                this.sendMail();
            });
    }
    Bleeding() {
        this.currentUser.Status = 'bleeding';
        this.userService.update(this.currentUser._id,this.currentUser)
            .subscribe(
            data => {
                var data = data;
                this.alertService.success('Successful to update Status', true);
                this.router.navigate(['']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            },
            () => {
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.sendMail();
            });
    }
    Lackofwater() {
        this.currentUser.Status = 'lackofwater';
        this.userService.update(this.currentUser._id,this.currentUser)
            .subscribe(
            data => {
                var data = data;
                this.alertService.success('Successful to update Status', true);
                this.router.navigate(['']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            },
            () => {
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.sendMail();
            });
    }
    Heartdisease() {
        this.currentUser.Status = 'heartdisease';
        this.userService.update(this.currentUser._id,this.currentUser)
            .subscribe(
            data => {
                var data = data;
                this.alertService.success('Successful to update Status', true);
                this.router.navigate(['']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            },
            () => {
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.sendMail();
            });
    }
    Normal() {
        this.currentUser.Status = 'normal';
        this.userService.update(this.currentUser._id,this.currentUser)
            .subscribe(
            data => {
                var data = data;
                this.alertService.success('Successful to update Status', true);
                this.router.navigate(['']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            },
            () => {
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.sendMail();
            });
    }




    loadUserById() {
        this.userService.getById(this.currentUser._id).subscribe
            (
            users => {
                
                users = users;
                console.log(users.username)
            }
            );
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
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
}