import { ViewChild, Component } from '@angular/core';
import { Router } from "@angular/router";
import { MediaMonitor, ObservableMedia } from "@angular/flex-layout";
import { MatDrawer } from "@angular/material";
import { AlertService, MediatorService, StorageService } from "../services";

@Component({
	templateUrl: "default.layout.html",
	styleUrls: ["default.layout.scss"],
})
export class DefaultLayout
{
	@ViewChild("sideNav")
	sideNav: MatDrawer;
	
	currencies: string[] = ["USD", "THB", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "TRY", "TWD", "ZAR"];
	accounts: string[] = [];

	constructor( public media: ObservableMedia, public alert: AlertService, public mediator: MediatorService, public storage: StorageService)
	{
		// Load last selected currency
		if(!storage.exists("currency"))
		{
			this.mediator.emit("currency", "USD");
		}else{
			this.mediator.emit("currency", storage.get("currency"));
		}

		// Load currencies from prefered list
		if(!storage.exists("prefered.currencies"))
		{
			storage.set("prefered.currencies", this.currencies);
		}else{
			this.currencies = storage.get("prefered.currencies");
		}
		
		// save accounts on update
		if(storage.exists("accounts"))
		{
			this.accounts = storage.get("accounts");
		}
		
		// Recover last selected account
		if(storage.exists("account"))
		{
			this.mediator.emit("account", storage.get("account"));
		}

		// Listen for accounts list changes
		this.mediator.subject("accounts.updated").subscribe( account => {
			this.accounts = storage.get("accounts");
			console.log("this.accounts:", this.accounts);
		});

		// Listen for account changes
		this.mediator.subject("account").subscribe( account => {
			if(!account)
				return;
			console.log("account switched");
			storage.set("account", account);
		});
	}

	switchCurrency(currency: string)
	{
		this.storage.set("currency", currency);
		this.mediator.emit("currency", currency);
		let lastIndex = this.currencies.indexOf(currency);
		this.currencies.unshift(this.currencies.splice(lastIndex, 1)[0]);
		this.storage.set("prefered.currencies", this.currencies);
	}

	switchAccount(account)
	{
		this.mediator.emit("account", account);
	}

	closeNav()
	{
		if(!this.media.isActive('gt-sm'))
		{
			this.sideNav.close();
		}	
	}
}

