import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../_models/index';


@Injectable()

export class UserService {
    
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/users').map((response: Response) => response.json());
    }

    getById(_id: string){
        return this.http.get('/users/' + _id).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/users/register', user);
    }
   // :Observable<User>
    update(_id: string,user: User):Observable<User>{
        return this.http.put('/users/' + _id, user).map((response: Response) => {
            let user = response.json();       
            // localStorage.setItem('currentUser', JSON.stringify(user));            
            return user;
        });
    }
    delete(_id: string) {
        return this.http.delete('/users/' + _id);
    }
    sendMail(user : User){
         return this.http.post('/users/sendmail', user);
    }
}   