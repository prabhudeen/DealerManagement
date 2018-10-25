import { Component, OnInit } from '@angular/core';
import { TableData } from '../../md/md-table/md-table.component';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-invoicemodel',
  templateUrl: './invoicemodel.component.html',
  styleUrls: ['./invoicemodel.component.css']
})
export class InvoicemodelComponent implements OnInit {

  public tableData1: TableData;
  public tableData2:TableData;
  constructor(private server: CommonService) { }

  ngOnInit() {
    this.tableData1 = {
      headerRow: [ 'DESCRIPTION', 'SALE AMOUNT', 'QTY', 'AMOUNT'],
      dataRows: [
          ['12345', 'NEW123', 'Oud-Turnhout', '$36,738']
      ]
   };
   this.tableData2 = {
    headerRow: [ 'CASH PAID', 'PROMO CODE', 'TOTAL AMOUNT'],
    dataRows: [
        ['12345', 'NEW123', '$36,738']
    ]
 };
  }

  invoiceData:any;
  // invoiceData={
  //   customerId:"12345",
	//   customerName:"XYZ",
	//   txnId:"12345",
	//   email:"xyz@gmail.com",
  //   mobile:"8877814640",
  //   pincode:"400709",
  //   promocode:"NEW409",
	//   city:"Mumbai",
	//   state:"Maharatra",
	//   address:"Reliance Corporate Park",
  //   timeStamp:"12345678876",
  //   itemType:"JioFI 4G Hotspot",
  //   dealerId: "dl1"

  // }
  getInvoiceData() {
    console.log("Invoice Data method call")
    let headers = new HttpHeaders();
    headers = headers.append('txnId', "Tx3");
    this.server.sendRequest('post', '/getTransactionById', null, headers, null).subscribe(
      (data) => {
        console.log(data);
        console.log("invoice data")
        this.invoiceData=data['body'];
      }
    );
    // this.validateUser(200);
  }

}
