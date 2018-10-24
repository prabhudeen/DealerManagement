import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { HttpHeaders } from '@angular/common/http';
import { CommonService, User } from '../../shared/common.service';
import { FormControl } from '@angular/forms';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ReportTableComponent implements OnInit {
  public dateTimeRange = [];

  public tableData3: TableData;
  transactionDataList: any = [];
  headers1: HttpHeaders;
  public statusArray: string[] = ["All", "True", "False"];
  public saleTypeList = [
    { name: 'All', value: 'All' },
    { name: 'SIM Activation', value: 'SimActivation' },
    { name: 'Recharge', value: 'Recharge' },
    { name: 'Device', value: 'Device' },
    { name: 'Device Exchange', value: 'DeviceExchange' }
  ]

  constructor(private reportService: ReportService) {
  }


  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  transaction: any = {};

  ngOnInit() {

    this.tableData3 = {
      headerRow: ['Txn ID', 'Sale Type', 'Amount', 'Date/Time', 'Commission', 'Statement'],
      dataRows: null
    };

    // if (this.user.username == null) {
    //   this.transaction = {
    //     lastWeek: 0,
    //     lastMonth: 0
    //   }
    // } else {

    //   this.reportService.getTransactionDetails().subscribe(
    //     (response) => {
    //       this.transactionDataList = response;
    //     });


    //   this.reportService.getTransaction().subscribe(
    //     (response) => {
    //       this.transaction = response;
    //     });
    // }

    this.reportService.getTransactionDetails().subscribe(
      (response) => {
        this.transactionDataList = response;
      });


    this.reportService.getTransaction().subscribe(
      (response) => {

        this.transaction = response;
        console.log(this.transaction);
      });


  }

}
