import { Subject, Observable, Observer, BehaviorSubject } from "rxjs";
import { CommonService, User } from "../../shared/common.service";
import { HttpHeaders } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { SessionService } from "../../shared/session.service";

@Injectable()
export class ReportService {

    private userName: string;
    transactionDataListObs = new EventEmitter<any[]>();
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
            'Content-Type': "application/json",
            "userToken":'11234'
        });

        this.server.sendRequest('get', '/getDealerDataByDealerId', null, headers1,false, 'GetDashboardData').subscribe(
            (response) => {
                console.log(response['body']);
                promiseTemp.next(response['body']['app-data'].slice());
            });
        return promiseTemp.asObservable();
    }

    getTransaction() {
        let promiseTemp = new Subject<any>();
            const headers1 = new HttpHeaders({
                'dealerId': this.userName,
            });
            this.server.sendRequest('post', '/getTransactionRange', null, headers1,false, null).subscribe(
                (response) => {
                    console.log(response['body']);
                    promiseTemp.next(response['body']);
                });

        return promiseTemp.asObservable();
    }

    addTransactionData(jsonBody) {
        let promiseTemp = new Subject<any>();
        const headers = new HttpHeaders({
            'Content-Type': "application/json"
        });
        this.server.sendRequest('post', '/submitSaleTransaction', jsonBody, headers,true, 'SumbitSaleTransaction').subscribe(
            () => {
                let counter = jsonBody['saleItems'].length;
                console.log(counter);
                this.updateTransactionList(counter);
                promiseTemp.next("Successful Added");
            }
        );
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