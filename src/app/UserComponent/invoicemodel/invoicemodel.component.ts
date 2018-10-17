import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';

@Component({
  selector: 'app-invoicemodel',
  templateUrl: './invoicemodel.component.html',
  styleUrls: ['./invoicemodel.component.css']
})
export class InvoicemodelComponent implements OnInit {

  public tableData1: TableData;
  public tableData2:TableData;
  constructor() { }

  ngOnInit() {
    this.tableData1 = {
      headerRow: [ 'DESCRIPTION', 'SALE AMOUNT', 'QTY', 'AMOUNT'],
      dataRows: [
          ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738']
      ]
   };
   this.tableData2 = {
    headerRow: [ 'CASH PAID', 'PROMO CODE', 'TOTAL AMOUNT'],
    dataRows: [
        ['Dakota Rice', 'Niger', '$36,73']
    ]
 };
  }

}
