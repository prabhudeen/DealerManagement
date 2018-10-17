import { Component, OnInit } from '@angular/core';



declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css']
})
export class TableFormComponent implements OnInit {
  public tableData1: TableData;

  public statusArray :string[]=['All','Active','Upcoming'];
  public object:any={};
  constructor() { }

  onSubmit(){
    console.log(this.object);
  }

  public status:string;
  ngOnInit() {
    this.tableData1 = {
      headerRow: [ 'ID', 'Name', 'By', 'Commission Type', 'SKU/Plan', 'Channel Name'],
      dataRows: [
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Upcoming'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Active'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Active'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Active'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Active'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Upcoming'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Upcoming'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Active'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Active'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Upcoming'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Active'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Active'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Upcoming'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Active'],
          ['12345', 'New Sim Sale', 'Reliance Retail', 'Sim Activation', 'Starter Plan', '3rd Party','Upcoming'],
      ]
   };


  }

}
