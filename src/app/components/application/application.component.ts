import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Applications } from '../../models/applications';
import { GITHUB } from '../../../data.constants';
import * as data from '../../../assets/data/FakeData.json';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
})
export class ApplicationComponent implements OnInit {
  dtOptionsApplication: DataTables.Settings = {};
  dtOptionsApplicationAjax: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  applications: Applications[] = [];
  data: any = (data as any).default;
  github = GITHUB;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    if(this.github){
      this.dtOptionsApplicationAjax = {
        ajax: '../../../assets/data/application.json',
        columns: [{
          title: 'Name',
          data: 'service'
        }, {
          title: 'Icône',
          data: 'service',
          render: function(data, type, row) {
            return '<img src="./assets/images/' +data+'-logo.jpg" width="auto" height="20"/>';
        }
      }, {
          title: 'Proto',
          data: 'protocole'
        }, {
          title: 'Other',
          data: 'other'
        }],
        pagingType: 'full_numbers',
        pageLength: 10,
        autoWidth: true,
        language: { url: '/assets/datatable-French.json' },
        stateSave: true
      };
    } else {
      this.dtOptionsApplication = {
        pagingType: 'full_numbers',
        pageLength: 10,
        autoWidth: true,
        language: { url: '/assets/datatable-French.json' },
        stateSave: true
      };
  
      this.httpClient.get('http://localhost:3000/getDataApplication').subscribe((getDataApplications) => {
        this.applications = (getDataApplications as any).data;
        this.dtTrigger.next();
      });
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
