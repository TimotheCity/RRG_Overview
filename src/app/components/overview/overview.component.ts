import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OverviewActives } from '../../models/overviewActives';
import { OverviewInactives } from '../../models/overviewInactives';
import { GITHUB } from '../../../data.constants';
import * as data from '../../../assets/data/FakeData.json';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  dtOptionsActive: DataTables.Settings = {};
  dtOptionsInactive: DataTables.Settings = {};
  dtOptionsActiveAjax: DataTables.Settings = {};
  dtOptionsInactiveAjax: DataTables.Settings = {};

  dtTriggerActive: Subject<any> = new Subject<any>();
  dtTriggerInactive: Subject<any> = new Subject<any>();
  overviewActives: OverviewActives[] = [];
  overviewInactives: OverviewInactives[] = [];
  data: any = (data as any).default;
  github = GITHUB;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    if (this.github) {
      this.dtOptionsActiveAjax = {
        ajax: '../../../assets/data/active.json',
        columns: [
          {
            title: 'Source',
            data: 'person',
          },
          {
            title: 'Destination',
            data: 'destinataire',
          },
          {
            title: 'Service',
            data: 'service',
          },
        ],
        pagingType: 'full_numbers',
        pageLength: 10,
        autoWidth: true,
        language: { url: '/assets/datatable-French.json' },
        stateSave: true,
      };
      this.dtOptionsInactiveAjax = {
        ajax: '../../../assets/data/inactive.json',
        columns: [
          {
            title: 'Destination',
            data: 'destinataire',
          },
          {
            title: 'Service',
            data: 'service',
          },
        ],
        pagingType: 'full_numbers',
        pageLength: 10,
        autoWidth: true,
        language: { url: '/assets/datatable-French.json' },
        stateSave: true,
      };
    } else {
      this.dtOptionsActive = {
        pagingType: 'full_numbers',
        pageLength: 10,
        autoWidth: true,
        language: { url: '/assets/datatable-French.json' },
        stateSave: true,
      };
      this.dtOptionsInactive = {
        pagingType: 'full_numbers',
        pageLength: 10,
        autoWidth: true,
        language: { url: '/assets/datatable-French.json' },
        stateSave: true,
      };

      this.httpClient
        .get('http://localhost:3000/getDataOverviewActive')
        .subscribe((getDataOverviewActive) => {
          this.overviewActives = (getDataOverviewActive as any).data;
          this.dtTriggerActive.next();
        });

      this.httpClient
        .get('http://localhost:3000/getDataOverviewInactive')
        .subscribe((getDataOverviewInactive) => {
          this.overviewInactives = (getDataOverviewInactive as any).data;
          this.dtTriggerInactive.next();
        });
    }
  }
  ngOnDestroy(): void {
    this.dtTriggerActive.unsubscribe();
    this.dtTriggerInactive.unsubscribe();
  }
}
