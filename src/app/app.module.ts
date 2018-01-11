import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

const DIRECTIVES = [];

import { UIModule } from "./ui.module";

import { ApplicationRoutes, ApplicationComponents, EntryComponents } from "./application.routes";

import {
	// App Services
	HTTPService,
	AlertService,
	MediatorService,
	StorageService,
	
	// Third Party Components
	AlertDialog,
	LoadingDialog,
	ConfirmationDialog, 

	// Cordova Services 
	AdService,
} from "./services";

// Root Component
@Component({
	selector: 'app-root',
	template: "<router-outlet></router-outlet>"
})
export class AppComponent{}

@NgModule({
	declarations: [
		AppComponent,
		ApplicationComponents,

		// Alert Service Components
		AlertDialog,
		LoadingDialog,
		ConfirmationDialog,

		DIRECTIVES,
		EntryComponents
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		UIModule,


		// Core modules
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,

		// HTTP & Json parser
		HttpModule,
		JsonpModule,

		// UI Modules
		UIModule,

		RouterModule.forRoot(ApplicationRoutes, { useHash: true }),
		ChartsModule,
	],
	entryComponents: [

		// Alert Service Components
		AlertDialog,
		LoadingDialog,
		ConfirmationDialog,

		EntryComponents,
	],
	providers: [
		// App Services
		HTTPService,
		AlertService,
		MediatorService,
		StorageService,
		// Cordova Services 
		AdService,
	],
	bootstrap: [AppComponent]
})
export class AppModule
{

}
