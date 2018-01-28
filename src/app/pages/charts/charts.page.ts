import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MediatorService, HTTPService, AlertService } from "../../services";
import { BaseChartDirective } from 'ng2-charts'
@Component({
	templateUrl: "charts.page.html",
	styleUrls: ["charts.page.scss"],
})
export class ChartsPage
{
	@ViewChild("chart")
	chart: BaseChartDirective;

	public chartOptions:any = {
		scaleShowVerticalLines: true,
		responsive: true,
		bezierCurve: false,
		elements: {
			line: {
				tension: 0
			}
		},
		scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    }
                }
            }]
        }
	};

	public startDate = new Date(Date.now() - (60*60*24*7*1000));
	public endDate = new Date(Date.now() + (60*60*24*7*1000));

	public loading = false;
	public historicalDays:string[] = [];
	public historicalData:any[] = [
		{data: [], label: 'Author' },
		{data: [], label: 'Curator'}
	];
 
 	constructor(public mediator: MediatorService, public router: Router, public http: HTTPService, public alert: AlertService)
	{
		
		if(!this.mediator.getValue("account"))
		{
			this.router.navigateByUrl("/app/accounts");
		}
	}

	
	refresh()
	{
		this.loadSubmissions(this.mediator.getValue("account"), this.mediator.getValue("currency"));
	}

	ngOnInit()
	{
		this.mediator.subject("account").subscribe( () => {
			this.refresh();
		});
		this.mediator.subject("currency").subscribe( () => {
			this.refresh();
		});
	}

	loadSubmissions(account, currency)
	{
		if(!account)
			return;
			
		this.loading = true;
		this.http.get("/steem/chart/" + account + "/" + currency).then( response => {
			this.loading = false;
			if(!response.success)
			{
				return this.alert.snackbar("Failed to get submissions.");
			}
			
			this.historicalData[0].data = response.pendingPosts.map( post => {
				return {
					x: new Date(post.date),
					y: post.earnings,
				}
			}).sort( (a, b) => {
				if(a.x.getTime() > b.x.getTime())
					return 1;
				else return -1;
			});
			
			this.historicalData[1].data = response.pendingComments.map( post => {
				return {
					x: new Date(post.date),
					y: post.earnings,
				}
			}).sort( (a, b) => {
				if(a.x.getTime() > b.x.getTime())
					return 1;
				else return -1;
			});
			console.log("Got historcal data:", this.historicalData);
			this.historicalData = this.historicalData.slice();
		//	this.chart.datasets = data;
		});
	}


}

