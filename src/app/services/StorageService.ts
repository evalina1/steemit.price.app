import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class StorageService
{
	constructor(){}

	exists(name: string): boolean
	{
		let l = localStorage.length;
		for(var i=0;i<l;++i)
		{
			if(localStorage.key(i) == name)
				return true;
		}
		return false;
	}

	get(name: string): any
	{
		try
		{
			return JSON.parse(localStorage.getItem(name));
		}catch(error)
		{
			console.log("[StorageService->GET] JSON parse error:", error);
			return null;
		}
	}

	set(name: string, value:any)
	{
		localStorage.setItem(name, JSON.stringify(value));
	}

	clear(name: string)
	{
		localStorage.removeItem(name);
	}
}
