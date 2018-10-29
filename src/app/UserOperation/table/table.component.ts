import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { Statement } from '@angular/compiler';
import { FormControl, Validators, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService, User } from '../../shared/common.service';
import { HttpHeaders } from '@angular/common/http';
import { ReportService } from '../../UserComponent/report-table/report.service';
import { SessionService } from '../../shared/session.service';
import { stringify } from '@angular/core/src/util';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})

export class TableComponent implements OnInit {
  userName: string;
  status: string;
  @ViewChild('form1') form1: NgForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  saleInfoData2: any;
  public dateTimeRange = [];
  productTypeList = [];
  transactionDataListTemp = [];
  planList = [];
  simActivation;
  recharge;
  deviceSale;
  deviceExchange;
  totalSale;
  totalComission;
  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  public tableData1: TableData;
  public tableData2: TableData;
  invoiceData: any;
  sales: string;
  form2;
  transactionDataList: any = [];
  tableData3: TableData;
  step: string;
  response: any;
  salesItems: any[];
  private totalSaleAmount = 0;
  private salesItems1: any[];
  Quantity: number = 0;
  Amount: number = 0;
  public saleInfoData: any;
  public CostumeInfo: any;
  public CustomerType = [];
  public saleTypeList = [];
  public saleTypeListHeader = [];
  public statusArray: string[] = [];
  displayedColumns: string[] = [];
  tableDataCopy=[];




  constructor(private server: CommonService,
    private reportService: ReportService,
    private sessionService: SessionService) {
    console.log('inside constructor');
  }

  ngOnInit() {

    this.CustomerType = [
      { id: 1, name: 'Subscriber' },
      { id: 1, name: 'Dealer' },
    ]

    this.saleTypeList = [
      { name: 'SIM Activation', value: 'SimActivation' },
      { name: 'Recharge', value: 'Recharge' },
      { name: 'Device Sale', value: 'DeviceSale' },
      { name: 'Device Exchange', value: 'DeviceExchange' }
    ]

    this.saleTypeListHeader = [
      { name: 'All', value: 'All' },
      { name: 'SIM Activation', value: 'SimActivation' },
      { name: 'Recharge', value: 'Recharge' },
      { name: 'Device Sale', value: 'DeviceSale' },
      { name: 'Device Exchange', value: 'DeviceExchange' }
    ]

    this.statusArray = ["All", "True", "False"];

    this.displayedColumns = ["All", "True", "False"];

    this.form2 = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      customerId: new FormControl('', [Validators.required]),
      Address1: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      customerType: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      promoCode: new FormControl('', [Validators.required]),
      customerName: new FormControl('', [Validators.required])
    });

    this.transactionDataList = [{
      "deviceExchange": "0",
      "deviceSale": "0",
      "recharge": "0",
      "simActivation": "0",
      "totalCommision": "0",
      "totalSale": "0"
    }];

    this.invoiceData = {};

    this.reportService.transactionDataListObs.subscribe(
      (response) => {
        this.transactionDataList = response;
        this.transactionDataListTemp = JSON.parse(JSON.stringify(response));
        this.simActivation = this.transactionDataList[this.transactionDataList.length - 1].simActivation;
        this.recharge = this.transactionDataList[this.transactionDataList.length - 1].recharge;
        this.deviceSale = this.transactionDataList[this.transactionDataList.length - 1].deviceSale;
        this.deviceExchange = this.transactionDataList[this.transactionDataList.length - 1].deviceExchange;
        this.totalSale = this.transactionDataList[this.transactionDataList.length - 1].totalSale;
        this.totalComission = this.transactionDataList[this.transactionDataList.length - 1].totalCommision;
        this.transactionDataListTemp.splice(this.transactionDataList.length - 1, 1);
        this.tableDataCopy=this.transactionDataListTemp;
        this.length = this.transactionDataListTemp.length;
        this.transactionDataListTemp = this.transactionDataListTemp.slice(0, 5);
        console.log(JSON.stringify(this.transactionDataListTemp));
       
      });

    console.log("inside ngonint");
    this.userName = this.sessionService.get('userName');
    console.log(this.userName);

    this.reportService.getTransactionDetails().subscribe(
      (response) => {
        this.transactionDataList = response;
        this.transactionDataListTemp = JSON.parse(JSON.stringify(response));
        this.simActivation = this.transactionDataList[this.transactionDataList.length - 1].simActivation;
        this.recharge = this.transactionDataList[this.transactionDataList.length - 1].recharge;
        this.deviceSale = this.transactionDataList[this.transactionDataList.length - 1].deviceSale;
        this.deviceExchange = this.transactionDataList[this.transactionDataList.length - 1].deviceExchange;
        this.totalSale = this.transactionDataList[this.transactionDataList.length - 1].totalSale;
        this.totalComission = this.transactionDataList[this.transactionDataList.length - 1].totalCommision;
        this.transactionDataListTemp.splice(this.transactionDataList.length - 1, 1);
        this.tableDataCopy=this.transactionDataListTemp;
        this.length = this.transactionDataListTemp.length;
        this.transactionDataListTemp = this.transactionDataListTemp.slice(0, 5);
      });

    this.salesItems = [{
      saleType: '',
      itemType: '',
      itemId: '',
      quantity: '',
      planId: '-',
      saleAmount: 0
    }];

    this.tableData3 = {
      headerRow: ['Txn ID', 'Sale Type', 'Amount', 'Date/Time', 'Commission', 'Statement'],
      dataRows: null
    };

  }

  totalAmountfunction() {
    let total = 0;
    for (let i = 0; i < this.salesItems.length; i++)
      total += this.salesItems[i].quantity * this.salesItems[i].saleAmount;
    return total;
  }

  createdDate() {
    let date = new Date();
    let month = date.getMonth() + 1;
    return '' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  getErrorEmailMessage() {
    return 'You must enter a valid email';
  }

  deleteTableRow(i) {
    this.salesItems.splice(i, 1);
  }

  onRecordTransactionClick() {
    this.step = 'one';
    this.salesItems = [];
    this.salesItems.push({
      saleType: '',
      itemType: '',
      itemId: '',
      quantity: '',
      planId: '-',
      saleAmount: 0
    });
    this.form2.reset();
  }

  onPageback2to1() {
    this.step = "one";
  }

  onPageback3to2() {
    this.step = "two";
  }

  pageFront1to2() {
    this.step = "two";
    console.log(JSON.stringify(this.salesItems));
    for (let i = 0; i < this.salesItems.length; i++) {
      console.log('entered');
      if (i == 0) {
        this.salesItems1 = [{
          saleType: this.salesItems[i].saleType,
          itemType: this.salesItems[i].itemType,
          commissionType: this.salesItems[i].saleType,
          itemId: this.salesItems[i].itemId,
          planId: this.salesItems[i].planId,
          saleAmount: this.salesItems[i].quantity * this.salesItems[i].saleAmount,
          quantity: this.salesItems[i].quantity
        }];
      } else {
        this.salesItems1.push({
          saleType: this.salesItems[i].saleType,
          itemType: this.salesItems[i].itemType,
          commissionType: this.salesItems[i].saleType,
          itemId: this.salesItems[i].itemId,
          planId: this.salesItems[i].planId,
          saleAmount: this.salesItems[i].quantity * this.salesItems[i].saleAmount,
          quantity: this.salesItems[i].quantity
        })
      }
    }

    for (let i = 0; i < this.salesItems1.length; i++) {
      this.totalSaleAmount += this.salesItems1[i].saleAmount;
    }

    this.saleInfoData = {
      "dealerId": this.userName,
      "totalSaleAmount": this.totalSaleAmount,
      "saleItems": this.salesItems1,
    };

    console.log(this.saleInfoData);
  }

  pageFront2to3() {
    this.step = "three";
    this.CostumeInfo = this.form2.value;
    console.log(this.CostumeInfo);
  }

  onSubmission() {
    console.log(this.saleInfoData);

    this.reportService.addTransactionData(this.saleInfoData).subscribe(
      (response) => {
        console.log(response);
      });

    //  console.log(this.saleInfoData);
    // const headers = new HttpHeaders({
    //   'Content-Type': "application/json"
    // })
    // this.server.sendRequest('post', '/submitSaleTransaction', this.saleInfoData, headers, null).subscribe(
    //   (data) => {
    //     console.log("inside response!")
    //     console.log(data);

    //     setTimeout(() => {
    //       this.UpdateTable();
    //     }, 30000);

    //   }
    // );

  }

  onAdd() {
    this.salesItems.push({
      saleType: '',
      itemType: '',
      itemId: '',
      quantity: '',
      planId: '',
      saleAmount: 0
    });
  }

  dicountedAmount() {
    return Math.round(this.saleInfoData.totalSaleAmount * .95);
  }

  onSaleTypeChange(saleType, index) {
    console.log('inside onSaleTypeChange:' + saleType + index);
    this.planList[index] = [];
    this.salesItems[index].saleAmount = null;
    this.salesItems[index].quantity = 0;
    this.salesItems[index].saleAmount = 0;
    this.salesItems[index].itemId='-';
    let tempList = [];
    switch (saleType) {
      case 'SimActivation':
        tempList = ['LTE Voice']
        this.productTypeList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'Recharge':
        tempList = ['LTE Mobility']
        this.productTypeList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'DeviceSale':
        tempList = ['STB', 'Feature Phone']
        this.productTypeList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'DeviceExchange':
        tempList = []
        this.productTypeList[index] = JSON.parse(JSON.stringify(tempList));
        break;
    }
  }

  onItemTypeChange(itemType, index) {
    this.planList[index] = [];
    this.salesItems[index].quantity = 0;
    this.salesItems[index].saleAmount = 0;
    this.salesItems[index].itemId='-';
    console.log('inside onItemTypeChange:' + itemType + index);
    let tempList = [];
    switch (itemType) {
      case 'LTE Voice':
        tempList = [{ name: 'Plan 1', value: 'p1' }]
        this.planList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'LTE Mobility':
        tempList = [{ name: 'Plan 2', value: 'p2' }]
        this.planList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'STB':
        tempList = [{ name: 'Plan 3', value: 'p3' }]
        this.planList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'Feature Phone':
        tempList = [{ name: 'Plan 4', value: 'p4' }, { name: 'Plan 5', value: 'p5' }]
        this.planList[index] = JSON.parse(JSON.stringify(tempList));
        break;
    }
  }

  onPlanTypeChange(plan, index) {
    console.log('amount change' + index);
    switch (plan) {
      case "p1":
        this.salesItems[index].saleAmount = 98;
        break;
      case "p2":
        this.salesItems[index].saleAmount = 399;
        break;
      case "p3":
        this.salesItems[index].saleAmount = 2000;
        break;
      case "p4":
        this.salesItems[index].saleAmount = 1299;
        break;
      case "p5":
        this.salesItems[index].saleAmount = 1499;
        break;
    }
  }

  onClickListener(index) {
    this.tableData2 = {
      headerRow: ['CASH PAID', 'PROMO CODE', 'TOTAL AMOUNT'],
      dataRows: [
        ['12345', 'NEW123', '$36,738']
      ]
    };

    // console.log("Invoice Data method call")
    // let headers = new HttpHeaders();
    // headers = headers.append('txnId', this.transactionDataListTemp[index].TxId);
    // this.server.sendRequest('post', '/getTransactionById', null, headers, null).subscribe(
    //   (data) => {
    //     // console.log(data);
    //     console.log("invoice data")
    //     this.invoiceData=data['body'];
    //     console.log(this.invoiceData);

    //   }
    // );
    this.invoiceData = {
      quantity:15,
      saleAmount:this.transactionDataListTemp[index].saleAmount,
      TxId:this.transactionDataListTemp[index].TxId,
      itemType:this.transactionDataListTemp[index].saleType,
      txCreatedTime:this.transactionDataListTemp[index].txCreatedTime,
      dealerId:"Dosapati Nikhil"
    };
  }

  selectSales(item: string) {
    this.sales = item;
  }

  selectSettlement(items: string) {
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

}


