import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  planResponseList=[];

  constructor(private server: CommonService) { }

  ngOnInit() {
 const headers1 = new HttpHeaders({
      
      });
  
  
      this.server.sendRequest('post', '/getAllPlan', null, headers1, null).subscribe(
  
        (data) => {
          this.planResponseList = data['body'];
          console.log(this.planResponseList);
        }
      );

    //  this.planResponseList= [
    //     {
    //         "mrp": "98",
    //         "oldDeviceBrand": "null",
    //         "oldDeviceType": "null",
    //         "planCircle": "All",
    //         "planId": "p1",
    //         "planStatus": "Active",
    //         "planVersion": "1.0",
    //         "plan_SKU": "SACHET 98",
    //         "productOffering": "Connectivity",
    //         "recordType": "plan",
    //         "saleAmount": "98",
    //         "serviceOffering": "LTE Voice"
    //     },
    //     {
    //         "mrp": "399",
    //         "oldDeviceBrand": "null",
    //         "oldDeviceType": "null",
    //         "planCircle": "All",
    //         "planId": "p2",
    //         "planStatus": "Active",
    //         "planVersion": "1.0",
    //         "plan_SKU": "MRP 399 - 84 Days",
    //         "productOffering": "Connectivity",
    //         "recordType": "plan",
    //         "saleAmount": "399",
    //         "serviceOffering": "LTE Mobility"
    //     },
    //     {
    //         "mrp": "2500",
    //         "oldDeviceBrand": "null",
    //         "oldDeviceType": "null",
    //         "planCircle": "All",
    //         "planId": "p3",
    //         "planStatus": "Active",
    //         "planVersion": "1.0",
    //         "plan_SKU": "Set Top Box 1",
    //         "productOffering": "Device",
    //         "recordType": "plan",
    //         "saleAmount": "2000",
    //         "serviceOffering": "STB"
    //     },
    //     {
    //         "mrp": "1399",
    //         "oldDeviceBrand": "null",
    //         "oldDeviceType": "null",
    //         "planCircle": "All",
    //         "planId": "p4",
    //         "planStatus": "Active",
    //         "planVersion": "1.0",
    //         "plan_SKU": "JioPhone",
    //         "productOffering": "Device",
    //         "recordType": "plan",
    //         "saleAmount": "1299",
    //         "serviceOffering": "Feature Phone"
    //     },
    //     {
    //         "mrp": "1499",
    //         "oldDeviceBrand": "null",
    //         "oldDeviceType": "null",
    //         "planCircle": "All",
    //         "planId": "p5",
    //         "planStatus": "Active",
    //         "planVersion": "1.0",
    //         "plan_SKU": "JioPhone2",
    //         "productOffering": "Device",
    //         "recordType": "plan",
    //         "saleAmount": "1499",
    //         "serviceOffering": "Feature Phone"
    //     }
    // ]
    

  }

}
