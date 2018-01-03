import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { SteemService } from "../../Services";
import 'rxjs/add/operator/map';

const CURRENCYMAP = {
	USD: "$",
	EUR: "€",
	THB: "฿"
};

const CURRENCYNAMES = {
	USD: "US Dollar",
	CAD: "Canadian Dollar",
	GBP: "British Pounds",
	EUR: "Euro",
	THB: "Thai Baht",
	HUF: "Hungarian Forint",
	HKD: "HK Dollar",
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{
	// Bunch of variables for now.. Sorry
	steemDollars: number = null;
	currencyName = "USD";
	calculatedPrice: number = 0;
	steemMoney: number = 0;
	currency: string = "USD";
	displayCurrency = "$";
	exchangeRate = 0;
	percentChange1h = 0;
	percentChange24h = 0;
	currenciesAvailable = ["USD", "THB", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "TRY", "TWD", "ZAR"];
	loadingUsers = false;
	steemitUsername: string = "";
	adHidden = false;
	constructor(public navCtrl: NavController, private http: Http, public loading: LoadingController, public toast: ToastController, public admob: AdMobFree, public steem: SteemService)
	{
		this.currency = localStorage.getItem("selected") || "USD";
		this.steemitUsername = localStorage.getItem("username") || "";
		
	}

	ngOnInit()
	{
		this.findUsername();
		this.retrievePrice();
		this.showAdvertisement();
	}
	
	timer = null;
	debounceFindUser()
	{
		clearTimeout(this.timer);
		if(this.steemitUsername.length <= 0)
			return;
		this.timer = setTimeout(() => {
			this.findUsername();
		}, 1000);
	}


	findUsername()
	{
		if(this.loadingUsers)
		{
			return;
		}
		this.loadingUsers = true;
		localStorage.setItem("username", this.steemitUsername);
		this.steemitUsername = this.steemitUsername.toLowerCase();
		this.steem.setUsername(this.steemitUsername);
		this.steem.getPendingPostRewards(this.steemitUsername).then( rewards => {
			this.loadingUsers = false;
			this.steemDollars = parseFloat(rewards.toFixed(3));
			this.updatePrice();
		}).catch( result =>{
			let error = result.payload.error;
			this.loadingUsers = false;
			this.toast.create({
				message: "An error occured: " + error.message + ", " + error.code,
				duration: 5000,
			}).present();
			this.steemDollars = 1000;
		});
		
	
		
	}

	retrievePrice()
	{
		localStorage.setItem("selected", this.currency);
		
		let loader = this.loading.create({
			content: "Getting exchange rates",
		});
		loader.present();
		this.http.get("https://api.coinmarketcap.com/v1/ticker/steem-dollars/?convert=" + this.currency).map(res => res.json()).subscribe(data => {
			
			var response = data[0];
			loader.dismiss();
			this.exchangeRate = response["price_" + this.currency.toLowerCase()];
			this.percentChange1h = response.percent_change_1h;
			this.percentChange24h = response.percent_change_24h;
			
			this.updatePrice();
		});
	}

	updatePrice()
	{
		this.steemMoney = ((this.steemDollars*0.75)*0.5);
		this.calculatedPrice = this.steemMoney * this.exchangeRate;
		this.currencyName = CURRENCYNAMES[this.currency];
		if(!this.currencyName)
		{
			this.currencyName = this.currency;
		}
		this.displayCurrency = CURRENCYMAP[this.currency];
		if(!this.displayCurrency)
		{
			this.displayCurrency = "";
		}
	}

	showAdvertisement()
	{
		localStorage.setItem("adHidden", null);
		let bannerConfig: AdMobFreeBannerConfig = {
            //isTesting: true, // Remove in production
            autoShow: true,
           	id: "ca-app-pub-7544720449540784/4923743606",
        };
		this.adHidden = false;
        this.admob.banner.config(bannerConfig);
 
        this.admob.banner.prepare().then((result) => {
            // success
        }).catch(e => console.log(e));
	}

	hideAd()
	{
		setTimeout(() => {
			localStorage.setItem("adHidden", "true");
			this.adHidden = true;
			this.admob.banner.hide();
		}, 1000);
	}
}
