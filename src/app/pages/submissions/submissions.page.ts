import { Component, } from '@angular/core';
import { Router } from "@angular/router";
import { MediatorService, HTTPService, AlertService } from "../../services";

interface IContribution
{
	title: string;
	beneficaries: any[];
	potentialPayout: number;
};

@Component({
	templateUrl: "submissions.page.html",
	styleUrls: ["submissions.page.scss"],
})
export class SubmissionsPage
{
	// Tools
	loading = true;
	contributions = [];
	constructor(public mediator: MediatorService, public router: Router, public http: HTTPService, public alert: AlertService)
	{
		if(!this.mediator.getValue("account"))
		{
			this.router.navigateByUrl("/app/accounts");
		}
	}

	ngOnInit()
	{
		//this.loadSubmissions(this.mediator.getValue("account"));
	}

	calculateEarnings()
	{
		
	}

	loadSubmissions(account)
	{
		if(!account)
			return;
			
		this.loading = true;
		this.http.get("/submissions/" + account).then( response => {
			this.loading = false;
			if(!response.success)
			{
				return this.alert.snackbar("Failed to get submissions.");
			}
			console.log("response:", response);
		})
	}

	
}

