import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../shared/common.service';
@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {
  responseList= [];
  tableDataCopy=[];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  length:number;
  constructor(private server: CommonService) { }

  ngOnInit() {

      const headers1 = new HttpHeaders({
      
      });
      this.server.sendRequest('post', '/getAllDealer', null, headers1, null).subscribe(
  
        (data) => {
          this.responseList = data['body'];
          console.log(this.responseList);
          this.tableDataCopy=this.responseList;
          this.length=this.tableDataCopy.length;
          this.responseList = this.responseList.slice(0,this.pageSize);
        }
      );
      
    //  this.responseList= [
    //     {
    //         "Address": "Ghansoli",
    //         "Emailaddress": "hello@techno.com",
    //         "jioPaymentsBank": "35235",
    //         "L1Parent": "null",
    //         "L2Parent": "null",
    //         "MobileNumber": "9012884810",
    //         "channelID": "Third Party",
    //         "dealerId": "dl1",
    //         "dealerName": "Techno",
    //         "dealerStatus": "Active",
    //         "dealerTier": "Platinum",
    //         "dealerType": "Reliance Digital",
    //         "recordType": "dealer"
    //     },
    //     {
    //         "Address": "Nerul",
    //         "Emailaddress": "contact@telco.com",
    //         "jioPaymentsBank": "1233341",
    //         "L1Parent": "null",
    //         "L2Parent": "null",
    //         "MobileNumber": "9898899823",
    //         "channelID": "Third Party",
    //         "dealerId": "dl2",
    //         "dealerName": "Telco Enterprise",
    //         "dealerStatus": "Active",
    //         "dealerTier": "Silver",
    //         "dealerType": "ZD",
    //         "recordType": "dealer"
    //     },
    //     {
    //         "Address": "Ghansoli",
    //         "EmailAddress": "hi@abc.com",
    //         "jioPaymentsBank": "6789979",
    //         "L1Parent": "dl2",
    //         "L2Parent": "null",
    //         "MobileNumber": "9041778788",
    //         "channelID": "Third Party",
    //         "dealerId": "dl3",
    //         "dealerName": "ABC Distributors",
    //         "dealerStatus": "Active",
    //         "dealerTier": "Gold",
    //         "dealerType": "RD",
    //         "recordType": "dealer"
    //     },
    //     {
    //         "Address": "Koparkhairane",
    //         "Emailaddress": "hello@kv.com",
    //         "jioPaymentsBank": "9090882",
    //         "L1Parent": "dl3",
    //         "L2Parent": "dl2",
    //         "MobileNumber": "9990874156",
    //         "channelID": "Third Party",
    //         "dealerId": "dl4",
    //         "dealerName": "VK Enterprises",
    //         "dealerStatus": "Active",
    //         "dealerTier": "Silver",
    //         "dealerType": "Retailer",
    //         "recordType": "dealer"
    //     },
    //     {
    //         "Address": "Delhi",
    //         "Emailaddress": "contact@xyz.com",
    //         "jioPaymentsBank": "16676767",
    //         "L1Parent": "null",
    //         "L2Parent": "null",
    //         "MobileNumber": "9952443141",
    //         "channelID": "Ecommerce",
    //         "dealerId": "dl5",
    //         "dealerName": "XYZ Solutions",
    //         "dealerStatus": "Active",
    //         "dealerTier": "Platinum",
    //         "dealerType": "MyJio",
    //         "recordType": "dealer"
    //     },
    //     {
    //         "Address": "Koparkhairane",
    //         "Emailaddress": "hello@kv.com",
    //         "jioPaymentsBank": "9090882",
    //         "L1Parent": "dl3",
    //         "L2Parent": "dl2",
    //         "MobileNumber": "9990874156",
    //         "channelID": "Third Party",
    //         "dealerId": "dl4",
    //         "dealerName": "VK Enterprises",
    //         "dealerStatus": "Active",
    //         "dealerTier": "Silver",
    //         "dealerType": "Retailer",
    //         "recordType": "dealer"
    //     },
    //     {
    //         "Address": "Koparkhairane",
    //         "Emailaddress": "hello@kv.com",
    //         "jioPaymentsBank": "9090882",
    //         "L1Parent": "dl3",
    //         "L2Parent": "dl2",
    //         "MobileNumber": "9990874156",
    //         "channelID": "Third Party",
    //         "dealerId": "dl4",
    //         "dealerName": "VK Enterprises",
    //         "dealerStatus": "Active",
    //         "dealerTier": "Silver",
    //         "dealerType": "Retailer",
    //         "recordType": "dealer"
    //     },
    //     {
    //         "Address": "Koparkhairane",
    //         "Emailaddress": "hello@kv.com",
    //         "jioPaymentsBank": "9090882",
    //         "L1Parent": "dl3",
    //         "L2Parent": "dl2",
    //         "MobileNumber": "9990874156",
    //         "channelID": "Third Party",
    //         "dealerId": "dl4",
    //         "dealerName": "VK Enterprises",
    //         "dealerStatus": "Active",
    //         "dealerTier": "Silver",
    //         "dealerType": "Retailer",
    //         "recordType": "dealer"
    //     }
    
    // ]
    // this.tableDataCopy=this.responseList;
    // this.length=this.tableDataCopy.length;
    // this.responseList = this.responseList.slice(0,this.pageSize);
    
  
    }

    
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.responseList=this.tableDataCopy;
    this.responseList = this.responseList.slice(firstCut, secondCut);

  }

  }


