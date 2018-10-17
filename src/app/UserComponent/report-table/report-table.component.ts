import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { HttpHeaders } from '@angular/common/http';
import { CommonService, User } from '../../shared/common.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
  encapsulation:ViewEncapsulation.None,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ReportTableComponent implements OnInit {
  public dateTimeRange=[];
  user: User;
  public tableData3: TableData;
  transactionDataList: any;
  headers1: HttpHeaders;
  public statusArray: string[] = ["All", "True", "False"];
  public saleTypeList = [
    'All',
    'SIM Activation',
    'Recharge',
    'Device',
    'Device Exchange'
  ]

  constructor(private server: CommonService) { }

  
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  ngOnInit() {

    this.tableData3 = {
      headerRow: ['Txn ID', 'Sale Type', 'Amount', 'Date/Time', 'Commission', 'Statement'],
      dataRows: null
    };

     this.transactionDataList=[{
      "TxId": "001",
      "saleType": "Device",
      "saleAmount": 234,
      "txCreatedTime": 1539257119000,
      "commission": "sale",
      "commissionSettlement": "False"
    },
    {
      "TxId": "002",
      "saleType": "Jio",
      "saleAmount": 234,
      "txCreatedTime": 1536043564000,
      "commission": "sale",
      "commissionSettlement": "True"
    },
    {
      "TxId": "001",
      "saleType": "Device",
      "saleAmount": 234,
      "txCreatedTime": "224738473847",
      "commission": "sale",
      "commissionSettlement": "False",
      "id": 127
    },
    {
      "TxId": "001",
      "saleType": "Device",
      "saleAmount": 234,
      "txCreatedTime": "224738473847",
      "commission": "sale",
      "commissionSettlement": "True",
      "id": 128
    },{
      "deviceExchange":"4",
      "deviceSale":"9",
      "recharge":"8",
      "simActivation":"9",
      "totalCommision":"322.50",
      "totalSale":"6450"
    }]

    // const headers1 = new HttpHeaders({
    //   'dealerId': this.user.username,
    // });

    // this.server.sendRequest('post', '/getDealerDataByDealerId', null, headers1, null).subscribe(

    //   (data) => {
    //     this.transactionDataList = data['body'];
    //     console.log(this.transactionDataList);

    //   }
    // );

  }

}


