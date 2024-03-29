import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { Chart, ChartConfiguration, ChartTypeRegistry, DoughnutControllerChartOptions } from 'chart.js/auto';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	responseMessage:any;
	data:any;
	categoryChart:any;

	ngAfterViewInit() { this.dashboardData(); }

	constructor(
		private dashboardService:DashboardService,
		private ngxService:NgxUiLoaderService,
		private snackBarService:SnackbarService) {
		this.ngxService.start();
		this.dashboardData();
	}

	dashboardData() {
		this.dashboardService.getDetails().subscribe((response:any) => {
			this.ngxService.stop();
			this.data = response;
		}, (error:any) => {
			this.ngxService.stop();
			console.log(error);
			if (error.error?.message) {
				this.responseMessage = error.error?.message;
			} else {
				this.responseMessage = GlobalConstants.genericError;
			}
			this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
		})
	}
}
