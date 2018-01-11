import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AdService
{
	private AdPresentingSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor()
	{

	}

	OnAdPresented(): Observable<any>
	{
		return this.AdPresentingSubject.asObservable();
	}

	presentAdvertisement()
	{

	}
}
