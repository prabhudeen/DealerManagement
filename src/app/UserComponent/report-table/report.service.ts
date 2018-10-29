import { Subject, Observable, Observer, BehaviorSubject } from "rxjs";
import { CommonService, User } from "../../shared/common.service";
import { HttpHeaders } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { SessionService } from "../../shared/session.service";

@Injectable()
export class ReportService {
    private userName: string;
    private obser = new BehaviorSubject<any>("");
    transactionDataListObs = new EventEmitter<any[]>();
    transactionDataList1: any = [
        {
            "TxId": "2",
            "saleType": "DeviceSale",
            "saleAmount": 234,
            "txCreatedTime": 1539257119,
            "commission": "23.4",
            "commissionSettlement": "False"
        },
        {
            "TxId": "1",
            "saleType": "SimActivation",
            "saleAmount": 356,
            "txCreatedTime": 1536043564,
            "commission": "35.6",
            "commissionSettlement": "True"
        },
        {
            "deviceExchange": "0",
            "deviceSale": "1",
            "recharge": "0",
            "simActivation": "1",
            "totalCommision": "175.5",
            "totalSale": "1755"
        }
    ];
    user: User;
    transation: any = {
        lastWeek: 2000,
        lastMonth: 100
    };

    constructor(private server: CommonService, private sessionService: SessionService) {
        this.userName = this.sessionService.get('userName');
    }

    getTransactionDetails() {

        let promiseTemp = new Subject<any>();
        const headers1 = new HttpHeaders({
            'dealerId': this.userName,
        });


        this.server.sendRequest('post', '/getDealerDataByDealerId', null, headers1, null).subscribe(
            (response) => {
                console.log(response['body']);
                promiseTemp.next(response['body'].slice());
            });

        // setTimeout(() => {
        //     console.log(this.transactionDataList1);
        //     promiseTemp.next(this.transactionDataList1);
        // }, 0);

        return promiseTemp.asObservable();
    }

    getTransaction() {
        let promiseTemp = new Subject<any>();
            const headers1 = new HttpHeaders({
                'dealerId': this.userName,
            });
            this.server.sendRequest('post', '/getTransactionRange', null, headers1, null).subscribe(
                (response) => {
                    console.log(response['body']);
                    promiseTemp.next(response['body']);
                });

        // setTimeout(() => {
        //     console.log(this.transation);
        //     promiseTemp.next(this.transation);
        // }, 0);

        return promiseTemp.asObservable();
    }

    addTransactionData(jsonBody) {
        let promiseTemp = new Subject<any>();
        // let jsonObject: any;
        // let counter = jsonBody['saleItems'].length;
        // let tempCounter = 0;
        // let txId = parseInt(this.transactionDataList1[0]['TxId']);
        // let timerTask = setInterval(
        //     () => {
        //         txId++;
        //         let size = this.transactionDataList1.length;
        //         let jsonlastObject = this.transactionDataList1[size - 1];
        //         this.transactionDataList1.splice(size - 1, 1);
        //         var date = new Date();
        //         jsonObject = {
        //             "TxId": txId,
        //             "saleType": jsonBody['saleItems'][tempCounter]['saleType'],
        //             "saleAmount": jsonBody['saleItems'][tempCounter]['saleAmount'],
        //             "txCreatedTime": (date.getTime() * 1)/1000,
        //             "commission": Math.round(jsonBody['saleItems'][tempCounter]['saleAmount'] * 0.1),
        //             "commissionSettlement": "True"
        //         }
        //         switch (jsonBody['saleItems'][tempCounter]['saleType']) {
        //             case "Recharge":
        //                 {

        //                     jsonlastObject['recharge'] = parseInt(jsonlastObject['recharge']) + 1;
        //                     break;
        //                 }
        //             case "DeviceExchange":
        //                 {

        //                     jsonlastObject['deviceExchange'] = parseInt(jsonlastObject['deviceExchange']) + 1;
        //                     break;
        //                 }
        //             case "DeviceSale":
        //                 {

        //                     jsonlastObject['deviceSale'] = parseInt(jsonlastObject['deviceSale']) + 1;
        //                     break;
        //                 }
        //             case "SimActivation":
        //                 {

        //                     jsonlastObject['simActivation'] = parseInt(jsonlastObject['simActivation']) + 1;
        //                     break;
        //                 }
        //             default: {
        //                 console.log('default');
        //             }
        //         }

        //         let totalcommission = parseInt(jsonlastObject['totalCommision']) + parseInt(jsonObject['commission']);
        //         let totalsale = parseInt(jsonlastObject['totalSale']) + parseInt(jsonObject['saleAmount']);
        //         jsonlastObject['totalCommision'] = totalcommission;
        //         jsonlastObject['totalSale'] = totalsale;
        //         console.log(totalcommission);
        //         console.log(totalsale);
        //        this.transactionDataList1.splice(0,0,jsonObject)  //will insert item into arr at the specified index (deleting 0 items first, that is, it's just an insert
        //         // this.transactionDataList1.insert(0,jsonObject);
        //         // this.transactionDataList1.push(jsonObject);
        //         this.transactionDataList1.push(jsonlastObject);
        //         tempCounter++;
        //         if (tempCounter == counter) {
        //             clearInterval(timerTask);
        //         }
        //     }, 3000);

        const headers = new HttpHeaders({
            'Content-Type': "application/json"
        });

        this.server.sendRequest('post', '/submitSaleTransaction', jsonBody, headers, null).subscribe(
            (data) => {

                let counter = jsonBody['saleItems'].length;
                console.log(counter);


                this.updateTransactionList(counter);
                // this.getTransactionDetails().subscribe(
                //     (response) => {
                //         // this.transactionDataListObs = response['body'];
                //         // this.obser.next(response['body']);
                //         // this.transactionDataListObs.emit(response);


                //         console.log(JSON.stringify(response));
                //     });

                promiseTemp.next("Successful Added");
            }
        );

        // this.updateTransactionList(counter);
        // promiseTemp.next("Successful Added");
        return promiseTemp.asObservable();
    }

    updateTransactionList(counter) {
        let tempCounter = counter;
        setTimeout(() => {
            this.getTransactionDetails().subscribe(
                (response) => {

                    this.transactionDataListObs.emit(response);
                });
        }, tempCounter * 3000)
    }

}