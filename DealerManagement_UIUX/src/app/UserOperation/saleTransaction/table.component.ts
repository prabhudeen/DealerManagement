import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators, NgForm, FormGroup } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { HttpHeaders } from '@angular/common/http';
import { SessionService } from '../../shared/session.service';
import { MatPaginator, PageEvent } from '@angular/material';
import { ReportService } from '../report-table/report.service';
import { OrderByPipe } from '../../Shared/order.pipe';
import { Datefilterpipe } from '../../Shared/datefilterpipe';
import { FilterPipe } from '../../Shared/Filter.pipe';
import { TableData } from '../../Helpers/md/md-table/md-table.component';
import { Observable } from 'rxjs';

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
  simActivation = 0;
  recharge = 0;
  deviceSale = 0;
  deviceExchange = 0;
  totalSale = 0;
  totalComission = 0;
  length: number = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  public tableData1: TableData;
  public tableData2: TableData;
  invoiceData: any;
  sales: string;
  form2;
  transactionDataList: any = [];
  tableDataCopyOriginal: any = [];
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
  tableDataCopy = [];
  saleTriggered: boolean = false;
  settlementTriggered: boolean = false;
  dateTriggered: boolean = false;

  constructor(private server: CommonService,
    private reportService: ReportService,
    private sessionService: SessionService) {
  }

  ngOnInit() {

    this.CustomerType = [
      { id: 1, name: 'Subscriber' },
      { id: 1, name: 'Dealer' },
    ]

    this.saleTypeList = [
      { name: 'SIM Activation', value: 'SimActivation' },
      { name: 'Recharge', value: 'Recharge' },
      { name: 'Device Sale', value: 'DeviceSale' }
    ]

    this.saleTypeListHeader = [
      { name: 'All', value: 'All' },
      { name: 'SIM Activation', value: 'SimActivation' },
      { name: 'Recharge', value: 'Recharge' },
      { name: 'Device Sale', value: 'DeviceSale' }
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
        let length = this.transactionDataList.length - 1; // length of the transactionDataList not global length variable
        this.transactionDataListTemp = JSON.parse(JSON.stringify(response));
        this.simActivation = this.transactionDataList[length - 1].simActivation;
        this.recharge = this.transactionDataList[length - 1].recharge;
        this.deviceSale = this.transactionDataList[length - 1].deviceSale;
        this.deviceExchange = this.transactionDataList[length - 1].deviceExchange;
        this.totalSale = this.transactionDataList[length - 1].totalSale;
        this.totalComission = this.transactionDataList[length - 1].totalCommision;
        this.transactionDataListTemp.splice(length - 1, 1);
        this.transactionDataListTemp = new OrderByPipe().transform(this.transactionDataListTemp, 'txCreatedTime');
        this.tableDataCopyOriginal = this.transactionDataListTemp;
        this.length = this.transactionDataListTemp.length;
        this.transactionDataListTemp = this.transactionDataListTemp.slice(0, this.pageSize);
      });

    this.userName = this.sessionService.get('userName');

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
        this.transactionDataListTemp = new OrderByPipe().transform(this.transactionDataListTemp, 'txCreatedTime');
        this.tableDataCopyOriginal = this.transactionDataListTemp;
        this.tableDataCopy = this.transactionDataListTemp;
        this.length = this.transactionDataListTemp.length;
        this.transactionDataListTemp = this.transactionDataListTemp.slice(0, this.pageSize);
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

  DateUpdate() {
    this.length = new Datefilterpipe().transform(this.tableDataCopyOriginal, this.dateTimeRange[0], this.dateTimeRange[1]).length;
    this.tableDataCopy = new Datefilterpipe().transform(this.tableDataCopyOriginal, this.dateTimeRange[0], this.dateTimeRange[1]);
    this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
  }

  pageFront1to2() {

    this.totalSaleAmount = 0;
    this.step ="two";
    for (let i = 0; i < this.salesItems.length; i++) {
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

  }

  pageFront2to3() {
    this.step = "three";
    this.CostumeInfo = this.form2.value;
  }

  onSubmission() {

    console.log(this.saleInfoData);
    this.reportService.addTransactionData(this.saleInfoData).subscribe(
      (response) => {
        console.log(response);
      });
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
    //using this function I am returning the total amount;
    return Math.round(this.saleInfoData.totalSaleAmount * 1);
  }

  onSaleTypeChange(saleType, index) {
    this.planList[index] = [];
    this.salesItems[index].saleAmount = null;
    this.salesItems[index].quantity = 1;
    this.salesItems[index].saleAmount = 0;
    this.salesItems[index].itemId = ' ';
    let tempList = [];
    switch (saleType) {
      case 'SimActivation':
        tempList = ['Connectivity']
        this.productTypeList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'Recharge':
        tempList = ['Main Plans', 'Booster Plans']
        this.productTypeList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'DeviceSale':
        tempList = ['Feature Phone', 'Set Top Box']
        this.productTypeList[index] = JSON.parse(JSON.stringify(tempList));
        break;
    }
  }

  onItemTypeChange(itemType, index) {
    this.planList[index] = [];
    this.salesItems[index].quantity = 1;
    this.salesItems[index].saleAmount = 0;
    this.salesItems[index].itemId = ' ';
    let tempList = [];
    switch (itemType) {
      case 'Connectivity':
        tempList = [{ name: 'Starter 98', value: 'p1' },
        { name: 'Starter 149', value: 'p2' }]
        this.planList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'Main Plans':
        tempList = [{ name: 'Rs. 399', value: 'p3' },
        { name: 'Rs. 459', value: 'p4' }]
        this.planList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'Booster Plans':
        tempList = [{ name: 'Rs. 21 – 1GB', value: 'p5' },
        { name: 'Rs. 51 – 3 GB', value: 'p6' }]
        this.planList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'Feature Phone':
        tempList = [{ name: 'JioPhone1', value: 'p7' }, { name: 'JioPhone2', value: 'p8' }]
        this.planList[index] = JSON.parse(JSON.stringify(tempList));
        break;
      case 'Set Top Box':
        tempList = [{ name: 'STB 1', value: 'p9' }]
        this.planList[index] = JSON.parse(JSON.stringify(tempList));
        break;
    }
  }

  onPlanTypeChange(plan, index) {
    switch (plan) {
      case "p1":
        this.salesItems[index].saleAmount = 98;
        break;
      case "p2":
        this.salesItems[index].saleAmount = 149;
        break;
      case "p3":
        this.salesItems[index].saleAmount = 399;
        break;
      case "p4":
        this.salesItems[index].saleAmount = 459;
        break;
      case "p5":
        this.salesItems[index].saleAmount = 21;
        break;
      case "p6":
        this.salesItems[index].saleAmount = 51;
        break;
      case "p7":
        this.salesItems[index].saleAmount = 1299;
        break;
      case "p8":
        this.salesItems[index].saleAmount = 1499;
        break;
      case "p9":
        this.salesItems[index].saleAmount = 2000;
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

    let headers = new HttpHeaders();

    headers = headers.append('txnId', this.transactionDataListTemp[index].TxId);
    this.server.sendRequest('get', null, null, headers,true,'GetTransactionById' ).subscribe(
      (data) => {
        this.invoiceData = data['body'];
        this.invoiceData.planId = this.GetPlanName(data['body'].planId);
      }
    );

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
      this.length=this.tableDataCopy.length;
      this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
    }else{
      this.tableDataCopy = new FilterPipe().transform(this.tableDataCopyOriginal, this.status);
      this.length=this.tableDataCopy.length;
      this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
      this.tableDataCopy = new FilterPipe().transform(this.tableDataCopy, item);
      this.length=this.tableDataCopy.length;
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
      this.length=this.tableDataCopy.length;
      this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
    } else {
      this.tableDataCopy = new FilterPipe().transform(this.tableDataCopyOriginal, this.sales);
      this.length=this.tableDataCopy.length;
      this.transactionDataListTemp = this.tableDataCopy.slice(0, this.pageSize);
      this.tableDataCopy = new FilterPipe().transform(this.tableDataCopy, items);
      this.length=this.tableDataCopy.length;
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

  GetPlanName(planId): string {
    switch (planId) {
      case 'p1': return 'Starter 98';
      case 'p2': return 'Starter 149';
      case 'p3': return 'Rs. 399';
      case 'p4': return 'Rs. 459';
      case 'p5': return 'Rs. 21 – 1GB';
      case 'p6': return 'Rs. 51 – 3 GB';
      case 'p7': return 'JioPhone 1';
      case 'p8': return 'JioPhone 2';
      case 'p9': return 'STB 1';
    }
  }

}


