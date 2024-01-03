import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

	responseMessage:any;
	data:any;

	ngAfterViewInit() { }

	constructor(private dashboardsService:DashboardService,
		private ngxService:NgxUiLoaderService,
		private snackbarService:SnackbarService) {
		this.ngxService.start();
		this.dashboardData();
	}

	dashboardData() {
		this.dashboardsService.getDetails().subscribe({
			next: (response:any) => {
				this.ngxService.stop();
				this.data = response;
			},
			error: (error:any) => {
				this.ngxService.stop();
				console.log(error);
				if(error.error?.message) {
					this.responseMessage = error.error?.message;
				} else {
					this.responseMessage = GlobalConstants.genericError;
				}
				this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
			},
		});
	}

}
