import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'alert-dialog',
	template: `
		<h2 mat-dialog-title>{{Title}}</h2>
		<mat-dialog-content>{{Message}}</mat-dialog-content>
		<mat-dialog-actions class="mt-20">
			<button mat-raised-button mat-dialog-close>Ok</button>
		</mat-dialog-actions>
	`,
})
export class AlertDialog
{
	Title: string = "";
	Message: string = "";

	constructor(@Inject(MAT_DIALOG_DATA) public data: any)
	{
		this.Title = data.title;
		this.Message = data.message;
	}
}

@Component({
	selector: 'loading-dialog',
	template: `
		<mat-dialog-content>
			<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
			{{Message}}
		</mat-dialog-content>
	`,
})
export class LoadingDialog
{
	Message: string = "Loading...";

	constructor(@Inject(MAT_DIALOG_DATA) public data: any)
	{
		this.Message = data.message;
	}
}

@Component({
	selector: 'confirmation-dialog',
	template: `
		<h3 mat-dialog-title>{{title}}</h3>
		<mat-dialog-content style="min-width: 280px; margin-bottom: 20px;">{{message}}</mat-dialog-content>
		<mat-dialog-actions layout="row" layout-align="space-around">
			<button mat-raised-button color="warn" (click)="dialogRef.close(true)">Yes</button>
			<button mat-raised-button color="primary" (click)="dialogRef.close(false)">No</button>
		</mat-dialog-actions>
	`,
})
export class ConfirmationDialog
{
	title: string = "Confirm";
	message: string = null;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmationDialog>)
	{
		this.title = data.title;
		this.message = data.message;
	}
}

@Injectable()
export class AlertService
{
	constructor(public dialog: MatDialog, private snackBar: MatSnackBar)
	{

	}

	error(message, title="Error")
	{
		this.open(title, message);
	}

	success(message)
	{
		this.open("Success", message);
	}

	info(message, title="Note")
	{
		this.open(title, message);
	}

	open(title, message): MatDialogRef<AlertDialog>
	{
		return this.dialog.open<AlertDialog>(AlertDialog, {
			data: {
				title: title,
				message: message,
			}
		});
	}

	confirm(title, message): MatDialogRef<ConfirmationDialog>
	{
		return this.dialog.open<ConfirmationDialog>(ConfirmationDialog, {
			data: {
				title: title,
				message: message,
			}
		});
	}

	loading(message="Loading..."): MatDialogRef<LoadingDialog>
	{
		return this.dialog.open<LoadingDialog>(LoadingDialog, {
			data: {
				message: message,
			}
		});
	}

	snackbar(message:string, action:string="Close", duration: number = 5000)
	{
		return this.snackBar.open(message, action, {
			duration: duration,
		});
	}
}
