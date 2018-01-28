import { Component, } from '@angular/core';
import { MediatorService, StorageService, AlertService } from "../../services";
import { Router } from "@angular/router";
@Component({
	templateUrl: "accounts.page.html",
	styleUrls: ["accounts.page.scss"],
})
export class AccountsPage
{
	accounts: string[] = [];
	constructor(public mediator: MediatorService, public storage: StorageService, public alert: AlertService, public router: Router)
	{

		if(storage.exists("accounts"))
		{
			this.accounts = storage.get("accounts");
		}
	}

	accountName:string = null;
	addAccount()
	{
		if(!this.accountName ||!this.accountName.length)
			return;

		this.accountName = this.accountName.toLowerCase().trim().replace(/ /g, "");
	
		// Don't add the account if it already exists
		if(this.accounts.indexOf(this.accountName) >= 0)
		{
			return;
		}

		if(!this.accounts.length)
		{
			this.mediator.emit("account", this.accountName);
		}
		
		this.accounts.push(this.accountName);
		this.storage.set("accounts", this.accounts);
		this.mediator.emit("accounts.updated");
		this.accountName = "";
	}

	removeAccount(account)
	{
		this.accounts.splice(this.accounts.indexOf(account), 1);
		this.storage.set("accounts", this.accounts);
		this.mediator.emit("accounts.updated");
		this.alert.snackbar(account + " account removed.");
	}

	selectAccount(account)
	{
		this.mediator.emit("account", account);
		this.router.navigateByUrl("/app/earnings");
	}
}

