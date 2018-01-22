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
	Posts = [];
	Comments = [];
	constructor(public mediator: MediatorService, public router: Router, public http: HTTPService, public alert: AlertService)
	{
		if(!this.mediator.getValue("account"))
		{
			this.router.navigateByUrl("/app/accounts");
		}
	}

	refresh()
	{
		this.Posts = [];
		this.Comments = [];
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
		this.http.get("/steem/pendingContributions/" + account + "/" + currency).then( response => {
			this.loading = false;
			if(!response.success)
			{
				return this.alert.snackbar("Failed to get submissions.");
			}

			this.Posts = response.pendingPosts;
			this.Comments = response.pendingComments;
		});
	}

	
}

