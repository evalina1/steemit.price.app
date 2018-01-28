import { Component, } from '@angular/core';
import { Router } from "@angular/router";
import { MediatorService, HTTPService, AlertService } from "../../services";

@Component({
	templateUrl: "calculator.page.html",
	styleUrls: ["calculator.page.scss"],
})
export class CalculatorPage
{

	// Tools
	loading = true;

	PotentialEarnings = 0;
	PayoutShares = 0;
	SteemShare = 0;
	RewardDistribution = 0;
	ExchangeRate = 0;
	
	
	constructor(public mediator: MediatorService, public router: Router, public http: HTTPService, public alert: AlertService)
	{
		if(!this.mediator.getValue("account"))
		{
			this.router.navigateByUrl("/app/accounts");
		}
	}

	ngOnInit()
	{
		this.mediator.subject("currency").subscribe( (currency) => {
			this.loadExchangeRates(currency);
		});
		
	}

	SBDEarnings = 0;
	TotalEarnings = 0;

	calculateSBDEarnings()
	{
		this.SBDEarnings = this.PotentialEarnings;
		if(this.PayoutShares)
		{
			this.SBDEarnings *= (1 - (this.PayoutShares / 100));
		}
		if(this.SteemShare)
		{
			this.SBDEarnings *= ( 1 - this.SteemShare);;
		}
		if(this.RewardDistribution)
		{
			this.SBDEarnings *= this.RewardDistribution;
		}
	}

	calculateEarnings($event)
	{
		console.log($event);
		this.calculateSBDEarnings();
		this.TotalEarnings = this.ExchangeRate * this.SBDEarnings;
	}

	loadExchangeRates(currency)
	{
		this.loading = true;
		this.http.get("/rates/" + currency).then( response => {
			this.loading = false;
			if(!response.success)
			{
				return this.alert.snackbar("Failed to get exchange rates.");
			}
			let market = response.marketStatus;
			this.SteemShare = response.steemShare;
			this.RewardDistribution = response.rewardDistribution;
			this.ExchangeRate = market.price;
			console.log("ExchangeRate", this.ExchangeRate, response);
		})
	}

	
}

