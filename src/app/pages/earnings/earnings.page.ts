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

	PayoutTotal = 0;
	PayoutShare = 0;
	PayoutSBD = 0;

	marketStatus = {
		price:0,
		change1h:0,
		change24h:0,
		change7d:0,
		currency: null
	};

	potentialEarnings = 0;
	authorEarnings = 0;
	curationEarnings = 0;

	constructor(public mediator: MediatorService, public router: Router, public http: HTTPService, public alert: AlertService)
	{
		if(!this.mediator.getValue("account"))
		{
			this.router.navigateByUrl("/app/accounts");
		}
		
	}

	refresh()
	{
		this.loadEarnings(this.mediator.getValue("account"), this.mediator.getValue("currency"));
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

	loadEarnings(account, currency)
	{
		if(!account)
			return;
			
		this.loading = true;
		this.http.get("/earnings/potential/" + account + "/" + currency).then( response => {
			this.loading = false;
			
			if(!response.success)
			{
				return this.alert.snackbar("Failed to get account.");
			}
			this.PayoutTotal = response.totalValue;
			this.PayoutShare = response.totalShares;
			this.PayoutSBD = response.totalSteem;
			this.marketStatus = response.marketStatus;

			this.authorEarnings = response.earnings.authorEarnings;
			this.curationEarnings = response.earnings.curationEarnings;
			console.log("response:", response);
		})
	}

	
}

