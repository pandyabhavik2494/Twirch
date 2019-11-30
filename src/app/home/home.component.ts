import {Component, Input} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'src/app/config/config.service';
import { Config } from 'src/app/config/config';
import { SolrServiceService } from 'src/app/solr-service.service';
import { Pager } from 'src/app/interfaces/pager';
import { Column } from 'src/app/interfaces/column';
import { DataService } from '../data.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'twirch';
  todoArray = [];

  config: Config;
  constructor(private http: HttpClient, private configService: ConfigService, private solrService: SolrServiceService, private newData: DataService) {
  }
  isHomePage = true
  url = '/solr/';
  apiUrl = '/select?indent=on&q=';
  apiQuery = '*:*';
  dataSource: any;
  allColumns: Array<Column>;
  displayedColumns: Array<Column>;
  removedColumns: Array<Column>;
  pageSize: string;
  solrUrl: string;
  solrCores: Array<string>;
  solrCore: string;
  pager: Pager;
  alertMessage: string;
  inputString: string;

  ngOnInit(): void {
    this.solrUrl = 'http://3.16.216.190:8983';
    this.solrCore = 'IRF19P4'
    this.allColumns = [];
    this.displayedColumns = [];
    this.removedColumns = [];
    this.pageSize = '10';
    this.pager = {} as Pager;
    this.pager.currentPage = 1;
    this.pager.totalPages = 1;
    this.pager.totalResults = 1;
    this.pager.startIndex = 0;
    this.alertMessage = '';
    // this.GetConfiguration();
  }

  private GetConfiguration() {
    this.alertMessage = '';
    this.configService.getConfig().subscribe(data => {
        this.config = data;
        this.solrUrl = data.solrUrl;
        this.GetSolrCore();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.ShowAlert('Client-side error occured.');
        } else {
          this.ShowAlert('Server-side error occured.');
        }
      });
  }

  pageSizeChange(event: any) {
    this.pageSize = event;
    this.GetSolrData();
  }

  ParseData(data: string) {
    const parsedData = JSON.parse(data);
    this.dataSource = parsedData.response.docs;
    this.SetPaging(parsedData.response.numFound);
  }

  SetPaging(totalRecords: number) {
    this.pager.totalResults = totalRecords;
    this.pager.totalPages = Math.ceil(totalRecords / Number.parseInt(this.pageSize));
  }

  ShowAlert(message: string) {
    this.alertMessage = message;
  }

  solrUrlChange(event: KeyboardEvent) {
    this.GetSolrCore();
  }

  setPage(pageNumber: number) {
    this.pager.currentPage = pageNumber;
    this.pager.startIndex = (pageNumber - 1) * Number.parseInt(this.pageSize);
    this.GetSolrData();
  }

  solrCoreChange(event: any) {
    if (this.solrUrl !== '' && this.solrUrl != null && this.solrCore !== '' && this.solrCore != null) {
      this.GetSolrSchema();
    }
  }

  addTodo() {
    // this.GetSolrCore();
    this.GetQueryResponse();
  }


  GetSolrData() {
    this.alertMessage = '';
    this.solrService.GetSolrData(this.solrUrl,
      this.url,
      this.solrCore,
      this.apiUrl,
      this.apiQuery,
      this.config.returnFormat,
      this.pageSize,
      this.pager.startIndex)
      .subscribe(data => {
          this.ParseData(data);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.ShowAlert('Client-side error occured.');
          } else {
            this.ShowAlert('Server-side error occured.');
          }
        });
  }

  GetSolrSchema() {
    this.alertMessage = '';
    this.solrService.getSolrSchema(this.solrUrl, this.solrCore).subscribe(data => {
        this.allColumns = data.fields;
        this.displayedColumns = data.fields;
        this.GetSolrData();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.ShowAlert('Client-side error occured.');
        } else {
          this.ShowAlert('Server-side error occured.');
        }
      });
  }

  GetQueryResponse() {
    this.alertMessage = '';
    this.solrService.getSearchResult(this.solrUrl,
      this.solrCore, this.inputString)
      .subscribe(data => {
          // this.ParseData(data);
          // this.newData.changeMessage(JSON.parse(data));
          // this.newData.changeMessage(JSON.stringify(data));
        this.newData.changeState(data);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.ShowAlert('Client-side error occured.');
          } else {
            this.ShowAlert('Server-side error occured.');
          }
        });
  }

  GetSolrCore() {
    this.alertMessage = '';
    if (this.solrUrl !== '' && this.solrUrl != null) {
      this.solrService.getSolrCores(this.solrUrl).subscribe(data => {
          this.solrCores = [];
          Object.keys(data.status).map(key => {
            this.solrCores.push(key);
            if (this.solrCores.length === 1) {
              this.solrCore = key;
              this.GetSolrSchema();
            }
          });
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.ShowAlert('Client-side error occured.');
          } else {
            this.ShowAlert('Server-side error occured.');
          }
        });
    }
  }
}
