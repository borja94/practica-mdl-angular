import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { _MatOptgroupMixinBase } from '@angular/material';

import { Token } from './token.model';
import { Role } from './role.model';
import { Error } from './error.model';

@Injectable()
export class HttpService {

    static API_END_POINT = 'https://practica-mdl-spring.herokuapp.com/api/v0';


    static UNAUTHORIZED = 401;

    private token: Token;

    private email: string;

    private params: URLSearchParams;

    private headers: Headers;

    private responseType: ResponseContentType;

    private successfulNotification = undefined;


    constructor(private http: Http,
        private toastrService: ToastrService,
        private router: Router) {
        this.resetOptions();
    }

    private resetOptions(): void {
        this.headers = new Headers();
        this.params = new URLSearchParams();
        this.responseType = ResponseContentType.Text;
    }

    logout(): void {
        this.token = undefined;
        this.email = undefined;
        this.router.navigate(['']);
    }

    login(email: string, password: string, endPoint: string): Observable<any> {
        return this.authBasic(email, password).post(endPoint).map(
            response => {
                this.token = JSON.parse(response._body);
            },
            error => this.logout()
        );
    }

    param(key: string, value: string): HttpService {
        this.params.append(key, value);
        return this;
    }

    header(key: string, value: string): HttpService {
        this.headers.append(key, value);
        return this;
    }

    authBasic(email: string, password: string): HttpService {
        this.headers.append('Authorization', 'Basic ' + btoa(email + ':' + password));
        return this;
    }

    authToken(): HttpService {
        let tokenValue = '';
        if (this.token !== undefined) {
            tokenValue = this.token.token;
        }
        this.headers.append('Authorization', 'Basic ' + btoa(tokenValue + ':' + ''));
        return this;
    }

    get(endpoint: string): Observable<any> {
        return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    post(endpoint: string, body?: Object): Observable<any> {
        return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions()).catch(
                error => {
                    return this.handleError(error);
                });
    }

    delete(endpoint: string): Observable<any> {
        return this.http.delete(HttpService.API_END_POINT + endpoint, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    put(endpoint: string, body?: Object): Observable<any> {
        return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    patch(endpoint: string, body?: Object): Observable<any> {
        return this.http.patch(HttpService.API_END_POINT + endpoint, body, this.createOptions()).map(
            response => this.extractData(response)).catch(
                error => {
                    return this.handleError(error);
                });
    }

    getToken (): Token {
        return this.token;
    }

    private createOptions(): RequestOptions {
        const options: RequestOptions = new RequestOptions({
            headers: this.headers,
            params: this.params,
            responseType: this.responseType
        });
        this.resetOptions();
        return options;
    }

    private extractData(response: Response): any {
        const contentType = response.headers.get('content-type');
        if (contentType) {
            if (contentType.indexOf('application/json') !== -1) {
                return response.json();
            }
        } else if (response.text()) {
            return response.text();
        } else {
            return response;
        }
    }


    private handleError(response: Response): any {

        if (response.status === HttpService.UNAUTHORIZED) {
            this.logout();
        }
        try {
            const error: Error = {
                httpError: response.status,
                exception: response.json().exception,
                message: response.json().message,
                path: response.json().path
            };
            this.toastrService.error('Error', error.message);
            return Observable.throw(error);
        } catch (e) {
            this.toastrService.error('Error', response.toString());
            return Observable.throw(response);
        }
    }
}
