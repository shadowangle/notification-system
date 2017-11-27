import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/index';
import { UserService, AlertService } from '../_services/index';
import { OAuthService } from 'angular2-oauth2/oauth-service';
@Component({
    moduleId: module.id,
    templateUrl: 'contact.component.html'
})

export class ContactComponent {
    currentUser: User;
    users: User[] = [];
    model: any = {};
    loading = false;


    constructor(private router: Router, private alertService: AlertService, private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }



    updateContact(id: string, mail: string) {
        this.loading = true;
        // console.log("id  = " +id +" mail = " + mail)
        this.currentUser.mail = mail;
        this.userService.update(id, this.currentUser)
            .subscribe(
            data => {

                var data = data;

                this.alertService.success('Successful to update contact to the system', true);
                this.router.navigate(['']);


            },
            error => {
                console.log(error)
                this.alertService.error(error);
                this.loading = false;
            },
            () => {
                this.currentUser.mail = this.model.mail;
                //    console.log(this.currentUser)
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            });
    }


}