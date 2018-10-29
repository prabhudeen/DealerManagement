import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { HttpHeaders } from '@angular/common/http';
import { CommonService, User } from '../../shared/common.service';
import { FormControl } from '@angular/forms';
import { ReportService } from './report.service';
import { PageEvent, MatPaginator, MatInputModule, MatFormFieldModule } from '@angular/material';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ReportTableComponent implements OnInit {
  tableDataCopy=[];
  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  public dateTimeRange = [];
  transactionDataListTemp = [];
  invoiceData: any;
  tableData2: any;
  triggered=false;
  public tableData3: TableData;
  transactionDataList: any = [];
  headers1: HttpHeaders;
  public statusArray: string[] =[];
  public saleTypeList;
  toppingList: string[] = [];
  transaction: any = {};
  sales = null;
  status = null;

  constructor(private reportService: ReportService, private server: CommonService) {
  }

  ngOnInit() {
    this.invoiceData = {};
    this.statusArray=["All", "True", "False"];
    this.toppingList=['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    this.saleTypeList=[
      { name: 'All', value: 'All' },
      { name: 'SIM Activation', value: 'SimActivation' },
      { name: 'Recharge', value: 'Recharge' },
      { name: 'Device Sale', value: 'DeviceSale' },
      { name: 'Device Exchange', value: 'DeviceExchange' }
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
        this.transactionDataListTemp = JSON.parse(JSON.stringify(response));
        this.transactionDataListTemp.splice(this.transactionDataList.length - 1, 1);
        this.tableDataCopy=this.transactionDataListTemp;
        this.length = this.transactionDataListTemp.length;
        this.transactionDataListTemp = this.transactionDataListTemp.slice(0, 5);
      });

    this.reportService.getTransaction().subscribe(
      (response) => {

        this.transaction = response;
        console.log(this.transaction);
      });


  }

  selectSales(item: string) {
    this.triggered=true;
    console.log(this.triggered);
    if(item==='All'){
    this.triggered=false;
    }
    this.sales = item;
  }

  selectSettlement(items: string) {
    this.triggered=true;
    this.triggered=true;
    if(items==='All'){
      this.triggered=false;
    }
    this.status = items;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.transactionDataListTemp=this.tableDataCopy;
    this.transactionDataListTemp = this.transactionDataListTemp.slice(firstCut, secondCut);

  }

  onClickListener(index) {
    this.tableData2 = {
      headerRow: ['CASH PAID', 'PROMO CODE', 'TOTAL AMOUNT'],
      dataRows: [
        ['12345', 'NEW123', '$36,738']
      ]
    };

    console.log("Invoice Data method call")
    let headers = new HttpHeaders();
    headers = headers.append('txnId', this.transactionDataListTemp[index].TxId);
    this.server.sendRequest('post', '/getTransactionById', null, headers, null).subscribe(
      (data) => {
        // console.log(data);
        console.log("invoice data")
        this.invoiceData = data['body'];
        console.log(this.invoiceData);

      }
    );
    // this.invoiceData = null;

  }


}
