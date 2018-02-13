import { Component, Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";

@Injectable()
export class MediatorService
{
	private MediatorSubjects: {[key: string]: BehaviorSubject<any>} = {};
	constructor()
	{

	}

	private createSubject(type)
	{
		if(!this.MediatorSubjects[type])
		{
			this.MediatorSubjects[type] = new BehaviorSubject<any>(null);
		}
	}

	emit(type: string, data?:any)
	{
		this.createSubject(type);
		this.MediatorSubjects[type].next(data);
	}

	subject(type: string): Observable<any>
	{
		this.createSubject(type);
		return this.MediatorSubjects[type].asObservable();
	}

	getValue(type: string): any
	{
		this.createSubject(type);
		return this.MediatorSubjects[type].getValue();
	}
}
