import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../shared/common.service';
import { ReportService } from './report.service';
import { PageEvent } from '@angular/material';
import { OrderByPipe } from '../../Shared/order.pipe';
import { Datefilterpipe } from '../../Shared/datefilterpipe';
import { FilterPipe } from '../../Shared/Filter.pipe';
import { TableData } from '../../Helpers/md/md-table/md-table.component';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ReportTableComponent implements OnInit {
  tableDataCopy = [];
  length: number = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  public dateTimeRange = [];
  transactionDataListTemp = [];
  invoiceData: any;
  tableData2: any;
  triggered = false;
  public tableData3: TableData;
  transactionDataList: any = [];
  headers1: HttpHeaders;
  public statusArray: string[] = [];
  public saleTypeList;
  toppingList: string[] = [];
  transaction: any = {};
  sales = null;
  status = null;
  tableDataCopyOriginal: any = [];
  saleTriggered: boolean = false;
  settlementTriggered: boolean = false;

  constructor(private reportService: ReportService, private server: CommonService) {
  }

  ngOnInit() {
    this.invoiceData = {};
    this.statusArray = ["All", "True", "False"];
    this.toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    this.saleTypeList = [
      { name: 'All', value: 'All' },
      { name: 'SIM Activation', value: 'SimActivation' },
      { name: 'Recharge', value: 'Recharge' },
      { name: 'Device Sale', value: 'DeviceSale' }
    ];
    this.tableData3 = {
      headerRow: ['Txn ID', 'Sale Type', 'Amount', 'Date/Time', 'Commission', 'Statement'],
      dataRows: null
    };

    this.transaction = {
      lastWeek: 0,
      lastMonth: 0
    }

    this.reportService.getTransactionDetails().subscribe(
      (response) => {
        this.transactionDataList = response;
        console.log('getTransactionDetails=='+JSON.stringify(this.transactionDataList));
        this.transactionDataListTemp = JSON.parse(JSON.stringify(response));
        this.transactionDataListTemp.splice(this.transactionDataList.length - 1, 1);
        this.transactionDataListTemp = new OrderByPipe().transform(this.transactionDataListTemp, 'txCreatedTime');
        this.tableDataCopyOriginal = this.transactionDataListTemp;
        this.tableDataCopy = this.transactionDataListTemp;
        this.length = this.transactionDataListTemp.length;
        this.transactionDataListTemp = this.transactionDataListTemp.slice(0, this.pageSize);
      });
    this.reportService.getTransaction().subscribe(
      (response) => {
        this.transaction = response;
      });
  }

  DateUpdate() {
    this.length = new Datefilterpipe().transform(this.tableDataCopyOriginal, this.dateTimeRange[0], this.dateTimeRange[1]).length;
    this.tableDataCopy = new Datefilterpipe().transform(this.tableDataCopyOriginal, this.dateTimeRange[0], this.dateTimeRange[1]);
    this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
  }

  selectSales(item: string) {

    this.sales = item;
    if (item != 'All') {
      this.saleTriggered = true;
    } else {
      this.saleTriggered = false;
    }

    if (!this.settlementTriggered) {
      this.tableDataCopy = new FilterPipe().transform(this.tableDataCopyOriginal, item);
      this.length = this.tableDataCopy.length;
      this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
    } else {
      this.tableDataCopy = new FilterPipe().transform(this.tableDataCopyOriginal, this.status);
      this.length = this.tableDataCopy.length;
      this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
      this.tableDataCopy = new FilterPipe().transform(this.tableDataCopy, item);
      this.length = this.tableDataCopy.length;
      this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
    }
  }

  getSaleColour() {
    if (this.saleTriggered) {
      return 'red';
    } else {
      return 'black';
    }
  }

  selectSettlement(items: string) {

    this.status = items;
    if (items != 'All') {
      this.settlementTriggered = true;
    } else {
      this.settlementTriggered = false;
    }

    if (!this.saleTriggered) {
      this.tableDataCopy = new FilterPipe().transform(this.tableDataCopyOriginal, items);
      this.length = this.tableDataCopy.length;
      this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
    } else {
      this.tableDataCopy = new FilterPipe().transform(this.tableDataCopyOriginal, this.sales);
      this.length = this.tableDataCopy.length;
      this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
      this.tableDataCopy = new FilterPipe().transform(this.tableDataCopy, items);
      this.length = this.tableDataCopy.length;
      this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
    }

  }

  getSettlementColour() {
    if (this.settlementTriggered) {
      return 'red';
    } else {
      return 'black';
    }
  }

  onPageChanged(e) {
    this.pageSize = e.pageSize;
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.transactionDataListTemp = this.tableDataCopy.slice(firstCut, secondCut);
  }

  onClickListener(index) {
    this.tableData2 = {
      headerRow: ['CASH PAID', 'PROMO CODE', 'TOTAL AMOUNT'],
      dataRows: [
        ['12345', 'NEW123', '$36,738']
      ]
    };

    let headers = new HttpHeaders();
    headers = headers.append('txnId', this.transactionDataListTemp[index].TxId);
    this.server.sendRequest('get', null, null, headers, false,'GetTransactionById').subscribe(
      (data) => {
        this.invoiceData = data['body'];
      }
    );
  }
}
