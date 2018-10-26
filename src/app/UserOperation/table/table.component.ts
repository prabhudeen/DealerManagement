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
  @ViewChild('form2') form2: NgForm;
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
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  public tableData1: TableData;
  public tableData2: TableData;

  invoiceData: any;


  ngOnInit() {

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
        this.length = this.transactionDataListTemp.length;
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
        this.length = this.transactionDataListTemp.length;
      });

    // console.log(this.transactionDataList);

    if (this.userName) {
      // console.log('inside if');
      // const headers1 = new HttpHeaders({
      //   'dealerId': this.userName,
      // });

      // console.log(headers1);
      // this.server.sendRequest('post', '/getDealerDataByDealerId', null, headers1, null).subscribe(

      //   (data) => {
      //     console.log(JSON.stringify(this.transactionDataList));
      //     setTimeout(() => {
      //       this.transactionDataList = JSON.parse(JSON.stringify(data['body']));
      //       console.log(JSON.stringify(this.transactionDataList));
      //     }, 500);
      //   }
      // );

      //  this.transactionDataList=this.reportService.getTransactionDetails();
      //  console.log(this.transactionDataList);

    }

    this.salesItems = [{
      saleType: '',
      itemType: '',
      itemId: '',
      quantity: '',
      planId: '',
      saleAmount: ''
    }];

    this.submit();
    this.tableData3 = {
      headerRow: ['Txn ID', 'Sale Type', 'Amount', 'Date/Time', 'Commission', 'Statement'],
      dataRows: null
    };

  }

  //   isEmpty(obj) {
  //     for(var prop in obj) {
  //         if(obj.hasOwnProperty(prop))
  //             return false;
  //     }

  //     return JSON.stringify(obj) === JSON.stringify({});
  // }

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
  userNameValidationLogin(e) {
    const re = /^([0-9]*)$/;
    if (re.test(String(e).toLowerCase())) {
      console.log("checking true");
      return "required quantity";

    } else {
      console.log("checking false")
      return '';

    }

  }

  // form2 = new FormGroup({
  //   SaleType: new FormControl('', [Validators.required]),
  //   ItemType: new FormControl('', [Validators.required]),
  //   Qty: new FormControl('', [Validators.required]),
  //   Plan:new FormControl('', [Validators.required]),
  //   saleAmount: new FormControl('', [Validators.required]),
  //   Details: new FormControl('', [Validators.required])
  // });

  form3 = new FormGroup({
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

  getErrorEmailMessage() {
    // return this.form2.get('email').hasError('required') ? 'You must enter a value' :
    // this.form2.get('email').hasError('email') ? 'Not a valid email' : '';
    return 'You must enter a valid email';
  }

  deleteTableRow(i) {
    this.salesItems.splice(i, 1);
  }

  transactionDataList: any = [];
  tableData3: TableData;
  step: string;
  response: any;
  salesItems: any[];
  private totalSaleAmount = 0;
  private salesItems1: any[];

  onReset() {
    this.step = "one";
    this.salesItems = [];
    this.salesItems.push({
      saleType: '',
      itemType: '',
      itemId: '',
      quantity: '',
      planId: '',
      saleAmount: ''
    });

    console.log(this.salesItems);

  }

  onRecordTransactionClick() {
    this.step = 'one';
    this.salesItems = [];
    this.salesItems.push({
      saleType: '',
      itemType: '',
      itemId: '',
      quantity: '',
      planId: '',
      saleAmount: ''
    });
    console.log(this.salesItems);
  }

  onPageback2to1() {
    this.step = "one";
  }

  onPageback3to2() {
    this.step = "two";
  }

  onNext() {
    // this.totalSaleAmount=this.form2.get('saleAmount').value*this.form2.get('Qty').value;
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
          quantity:this.salesItems[i].quantity
        }];
      } else {
        this.salesItems1.push({
          saleType: this.salesItems[i].saleType,
          itemType: this.salesItems[i].itemType,
          commissionType: this.salesItems[i].saleType,
          itemId: this.salesItems[i].itemId,
          planId: this.salesItems[i].planId,
          saleAmount: this.salesItems[i].quantity * this.salesItems[i].saleAmount,
          quantity:this.salesItems[i].quantity
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
      // "planId":this.form2.get('Plan').value,
      // "commissionType":this.form2.get('SaleType').value,

      // "saleType":this.form2.get('SaleType').value,

    };

    console.log(this.saleInfoData);
    this.step = "two";
    // this.form2.reset();
  }

  onSubmit() {
    this.step = "three";
    this.CostumeInfo = this.form3.value;
    console.log(this.CostumeInfo);
    // this.form3.reset();

  }

  // totalSaleAmountMethod(){
  //   return this.totalSaleAmount=this.form2.get('saleAmount').value*this.form2.get('Qty').value;
  // }

  modal2Close() {
    this.form2.reset();
    // this.form3.reset();
  }

  public CustomerType = [
    { id: 1, name: 'Subscriber' },
    { id: 1, name: 'Dealer' },
  ]

  public saleTypeList = [
    { name: 'SIM Activation', value: 'SimActivation' },
    { name: 'Recharge', value: 'Recharge' },
    { name: 'Device Sale', value: 'DeviceSale' },
    { name: 'Device Exchange', value: 'DeviceExchange' }
  ]

  public saleTypeListHeader = [
    { name: 'All', value: 'All' },
    { name: 'SIM Activation', value: 'SimActivation' },
    { name: 'Recharge', value: 'Recharge' },
    { name: 'Device Sale', value: 'DeviceSale' },
    { name: 'Device Exchange', value: 'DeviceExchange' }
  ]

  public itemType = [
    { id: 1, name: 'JioFi 4G Hotspot' },
    { id: 1, name: 'Jio Phone' },
    { id: 1, name: 'Jio Phone 2' },
    { id: 1, name: 'Jio STB' }
  ]

  public planType = [
    { name: 'Plan 1', value: 'p1' },
    { name: 'Plan 2', value: 'p2' },
  ]

  Quantity: number = 0;
  Amount: number = 0;

  public saleInfoData: any;
  public CostumeInfo: any;

  public statusArray: string[] = ["All", "True", "False"]
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(private server: CommonService,
    private reportService: ReportService,
    private sessionService: SessionService) {
    console.log('inside constructor');
  }

  // UpdateTable() {
  //   const headers1 = new HttpHeaders({
  //     'dealerId': this.userName,
  //   });

  //   this.server.sendRequest('post', '/getDealerDataByDealerId', null, headers1, null).subscribe(

  //     (data) => {
  //       this.transactionDataList = data['body'];
  //       console.log(this.transactionDataList);
  //     }
  //   );

  // }

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
      saleAmount: ''
    });

  }

  dicountedAmount() {
    return Math.round(this.saleInfoData.totalSaleAmount * .95);
  }

  sales: string;
  getWidth() {
    return '30%';

  }

  submit() {
    // this.transactionDataList = [{
    //   "TxId": "001",
    //   "saleType": "Device",
    //   "saleAmount": 234,
    //   "txCreatedTime": 1539257119000,
    //   "commission": "sale",
    //   "commissionSettlement": "False"
    // },
    // {
    //   "TxId": "002",
    //   "saleType": "Jio",
    //   "saleAmount": 234,
    //   "txCreatedTime": 1536043564000,
    //   "commission": "sale",
    //   "commissionSettlement": "True"
    // },
    // {
    //   "TxId": "001",
    //   "saleType": "Device",
    //   "saleAmount": 234,
    //   "txCreatedTime": 1541313964000,
    //   "commission": "sale",
    //   "commissionSettlement": "False",
    //   "id": 127
    // },
    // {
    //   "TxId": "001",
    //   "saleType": "Device",
    //   "saleAmount": 234,
    //   "txCreatedTime": 1538721964,
    //   "commission": "sale",
    //   "commissionSettlement": "True",
    //   "id": 128
    // }, {
    //   "deviceExchange": "4",
    //   "deviceSale": "9",
    //   "recharge": "8",
    //   "simActivation": "9",
    //   "totalCommision": "322.50",
    //   "totalSale": "6450"
    // }];

    // const headers1 = new HttpHeaders({
    //   'dealerId': this.user.username,
    // });

    // this.server.sendRequest('post', '/getDealerDataByDealerId', null, headers1, null).subscribe(

    //   (data) => {
    //     this.transactionDataList = data['body'].slice();
    //     console.log(JSON.stringify(this.transactionDataList));

    //   }
    // );

  }

  onSaleTypeChange(saleType, index) {
    console.log('inside onSaleTypeChange:' + saleType + index);
    this.planList[index] = [];
    this.salesItems[index].saleAmount = null;
    this.salesItems[index].quantity = 0;
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

    console.log("Invoice Data method call")
    let headers = new HttpHeaders();
    headers = headers.append('txnId', this.transactionDataListTemp[index].TxId);
    this.server.sendRequest('post', '/getTransactionById', null, headers, null).subscribe(
      (data) => {
        // console.log(data);
        console.log("invoice data")
        this.invoiceData=data['body'];
        console.log(this.invoiceData);
        
      }
    );
    // this.invoiceData = null;

  }

  sales23 = null;
  status123=null;
   selectSalesTable(item : string){
     this.sales23 = item;
   }
 
   selectSettlement(items: string){
     this.status123 = items;
   } 


  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.transactionDataList = this.transactionDataList.slice(firstCut, secondCut);
  }

}


