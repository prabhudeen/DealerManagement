import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {
  private appConfiguration: AppConfiguration;
  constructor(private httpClient: HttpClient) { }
  loadConfiguration(filePath: string) {
    return new Promise<string> ((resolve, reject) => {
      this.httpClient.get<AppConfiguration>(filePath).toPromise().then((response) => {
        this.appConfiguration = response;
        resolve("loaded the configuration file\n" + "Ip :" + this.appConfiguration.ip + "\nPort :"+this.appConfiguration.port );
      }).catch((response: any) => {
          console.log(`could not load configuration file error: \n ${JSON.stringify(response)}`);
          reject(`could not load configuration file error: \n ${JSON.stringify(response)}`);
      });
    });
  }
  public getConfiguration(): AppConfiguration {
    return this.appConfiguration;
  }
}
export interface AppConfiguration {
  ip: string;
  port: number;
}
