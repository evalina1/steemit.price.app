import 'hammerjs';
import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { FlexLayoutModule, } from '@angular/flex-layout';
//import "moment"; // Support for moment
//import { MomentModule } from 'angular2-moment';

const FLEX_LAYOUT_MODULES: any[] = [ FlexLayoutModule ];

const THIRDPARTY_MODULES: any[] = [
	// Angular Moment (Moment pipes & date utilities)
	// MomentModule,
];

const ANGULAR_MODULES: any[] = [
	FormsModule, ReactiveFormsModule
];

// Material
import {
	MatChipsModule, MatGridListModule, MatAutocompleteModule, MatDialogModule, MatRadioModule,
	MatButtonModule, MatCardModule, MatIconModule,
	MatListModule, MatMenuModule, MatTooltipModule,
	MatSlideToggleModule, MatInputModule, MatCheckboxModule,
	MatToolbarModule, MatSnackBarModule, MatSidenavModule,
	MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatProgressBarModule,
	MatIconRegistry, MatSliderModule, MatExpansionModule, MatRippleModule, MatButtonToggleModule, MatFormFieldModule
} from '@angular/material';

const MATERIAL_MODULES: any[] = [
	MatChipsModule, MatGridListModule, MatAutocompleteModule, MatDialogModule, MatRadioModule,
	MatButtonModule, MatCardModule, MatIconModule,
	MatListModule, MatMenuModule, MatTooltipModule,
	MatSlideToggleModule, MatInputModule, MatCheckboxModule,
	MatToolbarModule, MatSnackBarModule, MatSidenavModule,
	MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatExpansionModule, MatProgressSpinnerModule, MatProgressBarModule, MatRippleModule, MatButtonToggleModule,
	MatFormFieldModule
];

@NgModule({
	imports: [
		CommonModule,
		ANGULAR_MODULES,
		MATERIAL_MODULES,
		THIRDPARTY_MODULES,
		FLEX_LAYOUT_MODULES,
	],
	exports: [
		ANGULAR_MODULES,
		MATERIAL_MODULES,
		THIRDPARTY_MODULES,
		FLEX_LAYOUT_MODULES,
	]
})
export class UIModule
{
	constructor(private iconRegistry: MatIconRegistry)
	{
		iconRegistry.registerFontClassAlias('fontawesome', 'fa');
		iconRegistry.setDefaultFontSetClass("fa");
	}
}
