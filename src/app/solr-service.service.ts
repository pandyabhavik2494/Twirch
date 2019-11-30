import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {strictEqual} from 'assert';

@Injectable()
export class SolrServiceService {
  constructor(private httpService: HttpClient) {
  }
  url: string;
  inputStringArr: Array<string>;

  getSolrCores(solrUrl: string): Observable<any> {
    return this.httpService.get(solrUrl + '/solr/admin/cores?action=STATUS&wt=json', { responseType: 'json' });
  }

  getSolrSchema(solrUrl: string, core: string): Observable<any> {
    return this.httpService.get(solrUrl + '/solr/' + core + '/schema/fields', { responseType: 'json' });
  }

  getSearchResult(solrUrl: string, core: string, inputString: string): Observable<any> {
    this.url = solrUrl + '/solr/' + core + '/select?df=full_text&q=%22' + encodeURIComponent(inputString) + '%22%5E5%20';
    this.inputStringArr = inputString.split(' ');
    for (const str of this.inputStringArr) {
      this.url = this.url + '%20OR%20%22' + str + '%22';
    }
    this.url = this.url + '&rows=300';
    return this.httpService.get
    (this.url, { responseType: 'json' });
  }

  GetSolrData(solrUrl: string,
    url: string,
    solrCore: string,
    apiUrl: string,
    apiQuery: string,
    returnFormat: string,
    pageSize: string,
    startIndex: Number) {
    const solrRequest = solrUrl
      + url
      + solrCore
      + apiUrl
      + apiQuery
      + '&'
      + returnFormat
      + '&rows=' + pageSize
      + '&start=' + startIndex;
    return this.httpService.get(solrRequest, { responseType: 'text' });
  }

}
