import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute } from '@angular/router';


// Layouts
import { DefaultLayout } from "./layouts";

// Pages
import { EarningsPage } from "./pages/earnings";
import { AccountsPage } from "./pages/accounts";
import { SubmissionsPage } from "./pages/submissions";
import { ChartsPage } from "./pages/charts";
import { CalculatorPage } from "./pages/calculator";

export const ApplicationRoutes: Routes = [
	{
		path: "app",
		component: DefaultLayout,
		children: [
			{
				path: "earnings",
				component: EarningsPage,
			},
			{
				path: "contributions",
				component: SubmissionsPage,
			},
			{
				path: "accounts",
				component: AccountsPage,
			},
			{
				path: "charts",
				component: ChartsPage,
			},
			{
				path: "calculator",
				component: CalculatorPage,
			}
		],
	},
	
	{
		path: '**',
		redirectTo: '/app/earnings',
	},
	{
		path: '**',
		component: DefaultLayout
	}
];

export const EntryComponents: any[] = [
	
];

export const ApplicationComponents: any[] = [
	// Layouts
	DefaultLayout,
	
	// Pages
	EarningsPage,
	AccountsPage,
	SubmissionsPage,
	CalculatorPage,
	ChartsPage,
];
