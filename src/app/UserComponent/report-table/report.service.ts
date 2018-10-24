import { Subject, Observable, Observer, BehaviorSubject } from "rxjs";
import { CommonService, User } from "../../shared/common.service";
import { HttpHeaders } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { SessionService } from "../../shared/session.service";

@Injectable()
export class ReportService {
    private userName:string;

    private obser = new BehaviorSubject<any>("");

    transactionDataListObs = new EventEmitter<any[]>();

    transactionDataList: any = [{
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
    }];

    user: User;

    transation: any = {
        lastWeek: 2000,
        lastMonth: 100
    };

    constructor(private server: CommonService, private sessionService:SessionService) {
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
        //     console.log(this.transactionDataList);
        //     promiseTemp.next(this.transactionDataList);
        // }, 3000);

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
        // }, 3000);

        return promiseTemp.asObservable();
    }

    addTransactionData(jsonBody) {

        let promiseTemp = new Subject<any>();

        const headers = new HttpHeaders({
            'Content-Type': "application/json"
        });

        this.server.sendRequest('post', '/submitSaleTransaction', jsonBody, headers, null).subscribe(
            (data) => {
                this.getTransactionDetails().subscribe(
                    (response) => {
                        // this.transactionDataListObs = response['body'];
                        // this.obser.next(response['body']);
                        this.transactionDataListObs.emit(response);

                        console.log(JSON.stringify(response));
                    });

                promiseTemp.next("Successful Added");
            }
        );

        return promiseTemp.asObservable();

    }

}