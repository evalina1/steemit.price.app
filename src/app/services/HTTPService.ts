import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ApplicationConfig } from '../config';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/Rx';

@Injectable()
export class HTTPService
{
	
	static DefaultError = {success: false, message: "Something Went wrong"};
	static ConnectionError = {success: false, message: "Connection error."};

	constructor(private http: Http, private router: Router)
	{
	}

	get(url): Promise<any>
	{
		return this.http.get(ApplicationConfig.baseUrl + url).map(response => {
			return response.json() || HTTPService.DefaultError;
		}).catch((error: Response | any) => {
			if(error.status == 0)
			{
				return Observable.throw(HTTPService.ConnectionError);
			}
			return Observable.throw(error);
		}).toPromise().then(response => {
			return response;
		}).catch(error => {
			console.log("[GET] Error", url, error);
			if(!error.message)
				error.message = "Something went wrong.";
			return Promise.resolve({success: false, message: error.message});
		});
	}

	post(url, body): Promise<any>
	{
		return this.http.post(ApplicationConfig.baseUrl + url, JSON.stringify( body ), { withCredentials: false }).map(response => {
			return response.json() || HTTPService.DefaultError;
		}).catch((error: Response | any) => {
			console.log("POST Error:", ApplicationConfig.baseUrl + url, error);
			if(error.status == 0)
			{
				return Observable.throw(HTTPService.ConnectionError);
			}
			return Observable.throw(error);
		}).toPromise().then(response => {
			return response;
		}).catch(error => {
			console.log("[POST] Error", url, error);
			if(!error.message)
				error.message = "Something went wrong.";
			return Promise.resolve({success: false, message: error.message});
		});
	}

}
