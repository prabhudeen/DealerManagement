import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { EventConstants } from './constant.model';
import { AppConfigurationService } from '../app-configuration.service';
declare const $: any;
export class User {
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private httpClient: HttpClient, private appConfigurationService: AppConfigurationService) { }
  private user = {

    username: null,

  };

 

  setUser(user: User) {

    this.user = user;

  }

 

  getUser(): User {

    return this.user;

  }

 

  sendRequest(requestType: string, context: string,

    reqBody: any, headers: HttpHeaders, flag: boolean, queryString: string): Observable<HttpResponse<any>> {

    let url: string;

 

    switch (queryString) {

 

      case 'GetDashboardData':

        url = "http://10.64.213.54:9920/jbdicm/eventHandler?action=getDashBoardData&dealerId=dl3";

        break;

 

      case 'CreateCommmision':

        url = "http://10.64.222.30:2290/67d7c280-384d-18bf-bd14-005056bb869f/eventHandler?action=createCommission";

        break;

 

      case 'SumbitSaleTransaction':

        url = "http://10.64.213.54:9920/27a91d80-3816-18bf-bd14-005056bb869f/eventHandler?action=submitSaleTransaction";

        break;

 

    }

    // let appConfiguration= this.appConfigurationService.getConfiguration();

    // let url: string = 'http://10.64.217.120:8090' + context;

 

    // url = `${EventConstants.PROTOCOL}${EventConstants.IP}:${EventConstants.PORT}`;

    // // url=configUrl;

    // if (context) {

    //   url = `${url}${context}`;

    // } else {

    //   url = `${url}${EventConstants.CONTEXT}`;

    // }

 

    // if (queryString) {

    //   url = `${url}${queryString}`;

    // }

 

    // url = `${url}${context}`;

 

    console.log(`Sending Request : Type = `, requestType, ` | URL = `

      , url, `| request body = `, JSON.stringify(reqBody));

 

    const httpOptions = {

      headers: headers,

      observe: 'response' as 'body'

    };

 

    switch (requestType.toUpperCase()) {

      case 'POST':

        return new Observable<any>(observe => {

          this.httpClient.post(url, reqBody, httpOptions).subscribe(

            (response) => {

              if (flag)

                this.displayToaster(response);

              observe.next(response);

            },

            (error) => {

              console.log(JSON.stringify(error));

              this.displayToaster(error);

              observe.next(error);

            }

          );

        });

      case 'GET':

        return new Observable<any>(observe => {

          this.httpClient.get(url, httpOptions).subscribe(

            (response) => {

              if (flag)

                this.displayToaster(response);

              observe.next(response);

            },

            (error) => {

              console.log(JSON.stringify(error));

              this.displayToaster(error);

              observe.next(error);

            }

          );

        });

      case 'PUT':

        return new Observable<any>(observe => {

          this.httpClient.put(url, reqBody, httpOptions).subscribe(

            (response) => {

              if (flag)

                this.displayToaster(response);

              observe.next(response);

            },

            (error) => 
              console.log(JSON.stringify(error));

              this.displayToaster(error);

              observe.next(error);

            }

          );

        });

 

      case 'DELETE':

        return new Observable<any>(observe => {

          this.httpClient.delete(url, httpOptions).subscribe(

            (response) => {

              if (flag)

                this.displayToaster(response);

              observe.next(response);

            },

            (error) => {

              console.log(JSON.stringify(error));

              this.displayToaster(error);

              observe.next(error);

            }

          );

        });

    }

  }

 

  displayToaster(response) {

    let toasterType;

    let toasterMsg;

    if (response['status'] === 200) {

      toasterType = 'success';

      toasterMsg = 'Response Received Successfully';

      console.log(` Status = ` + response['type']

        + ` | Http Status = ` + response['http-status-code']

        + ` | Subscriber = `

        + ` | appData = `

        + JSON.stringify(response['app-data']));

    } else if (response['status'] === 202) {

     toasterType = 'warning';

      toasterMsg = response['body']['description'];

      console.log(` | Message = `

        + JSON.stringify(response['body']['description']));

    } else if (response['status'] === 401) {

      toasterType = 'danger';

      toasterMsg = response['statusText'];

      console.log(` | Message = `

        + JSON.stringify(response['statusText']));

    }

    else {

      toasterType = 'danger';

      toasterMsg = `Error Ack : ` + response['error-message'];

      console.log(` | Message = `

        + JSON.stringify(response['error-message']));

    }

    $.notify({

      icon: 'add_alert',

      message: toasterMsg

    }, {

        type: toasterType,

        delay: 500,

        timer: 800,

        placement: {

          from: 'top',

          align: 'right'

        },

        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +

          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">' +

          '<i class="material-icons">close</i></button>' +

          '<i class="material-icons" data-notify="icon">notifications</i> ' +

          '<span data-notify="title">{1}</span> ' +

          '<span data-notify="message">{2}</span>' +

          '<div class="progress" data-notify="progressbar">' +

          '<div class="progress-bar progress-bar-{0}" role="progressbar" ' +

          'aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +

          '</div>' +

          '<a target="{4}" data-notify="url"></a>' +

          '</div>'

      });

  }

}