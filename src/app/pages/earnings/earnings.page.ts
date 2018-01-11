import { Component, } from '@angular/core';
import { Router } from "@angular/router";
import { MediatorService, HTTPService, AlertService } from "../../services";

@Component({
	templateUrl: "earnings.page.html",
	styleUrls: ["earnings.page.scss"],
})
export class EarningsPage
{

	// Tools
	loading = true;

	potentialPayoutTotal = 0;
	potentialPayoutRewardShare = 0.375;
	potentialPayoutSBD = 0;
	exchangeRate = 200;
	potentialEarnings = 0;
	
	constructor(public mediator: MediatorService, public router: Router, public http: HTTPService, public alert: AlertService)
	{
		if(!this.mediator.getValue("account"))
		{
			this.router.navigateByUrl("/app/accounts");
		}
	}

	ngOnInit()
	{
		//this.loadAccount(this.mediator.getValue("account"));
	}

	calculateEarnings()
	{
		
	}

	loadAccount(account)
	{
		if(!account)
			return;
			
		this.loading = true;
		this.http.get("/account/" + account).then( response => {
			this.loading = false;
			if(!response.success)
			{
				return this.alert.snackbar("Failed to get account.");
			}
			console.log("response:", response);
		})
	}

	
}

