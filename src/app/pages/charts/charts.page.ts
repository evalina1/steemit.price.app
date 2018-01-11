import { Component, } from '@angular/core';
import { Router } from "@angular/router";
import { MediatorService, HTTPService, AlertService } from "../../services";

@Component({
	templateUrl: "charts.page.html",
	styleUrls: ["charts.page.scss"],
})
export class ChartsPage
{
	public chartOptions:any = {
		scaleShowVerticalLines: true,
		responsive: true
	};

	public startDate = new Date(Date.now() - (60*60*24*7*1000));
	public endDate = new Date(Date.now() + (60*60*24*7*1000));

	public loading = false;
	public historicalDays:string[] = [];
	public historicalData:any[] = [
		{data: [65, 59, 80, 81, 56, 55, 40], label: 'Author' },
		{data: [28, 48, 40, 19, 86, 27, 90], label: 'Curator'}
	];
 
 	constructor(public mediator: MediatorService, public router: Router, public http: HTTPService, public alert: AlertService)
	{
		if(!this.mediator.getValue("account"))
		{
			this.router.navigateByUrl("/app/accounts");
		}
	}
}

