import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SolrServiceService {
  constructor(private httpService: HttpClient) {
  }
  url: string;
  urlBr: string;
  urlUSA: string;
  urlIn: string;
  inputStringArr: Array<string>;

  getAnaBrazil(solrUrl: string, core: string): Observable<any> {
    this.urlBr = solrUrl + '/solr/' + core + '/select?df=full_text&facet.field=user.screen_name&facet.field=in_reply_to_screen_name&facet.field=lang&facet.field=tweet_sentiment&facet.field=entities.hashtags.text&facet=on&fq=country%3ABrazil&q=*%3A*&rows=0';
    return this.httpService.get
    (this.urlBr, { responseType: 'json' });
  }

  getAnaIndia(solrUrl: string, core: string): Observable<any> {
    this.urlIn = solrUrl + '/solr/' + core + '/select?df=full_text&facet.field=user.screen_name&facet.field=in_reply_to_screen_name&facet.field=lang&facet.field=tweet_sentiment&facet.field=entities.hashtags.text&facet=on&fq=country%3AIndia&q=*%3A*&rows=0';
    return this.httpService.get
    (this.urlIn, { responseType: 'json' });
  }

  getAnaUSA(solrUrl: string, core: string): Observable<any> {
    this.urlUSA = solrUrl + '/solr/' + core + '/select?df=full_text&facet.field=user.screen_name&facet.field=in_reply_to_screen_name&facet.field=lang&facet.field=tweet_sentiment&facet.field=entities.hashtags.text&facet=on&fq=country%3AUSA&q=*%3A*&rows=0';
    return this.httpService.get
    (this.urlUSA, { responseType: 'json' });
  }


  getSearchResult(solrUrl: string, core: string, inputString: string): Observable<any> {
    this.url = solrUrl + '/solr/' + core + '/select?df=full_text&facet.field=lang&facet.field=verified&facet.field=country&facet.field=tweet_sentiment&facet.field=entities.hashtags.text&facet=on&q=(%22' + encodeURIComponent(inputString) + '%22%20AND%20verified%3Atrue)%5E8';
    this.url = this.url + '%20OR%20%22' + encodeURIComponent(inputString) + '%22%5E5%20OR%20((';
    this.inputStringArr = inputString.split(' ');
    this.url = this.url + '%22' + this.inputStringArr[0] + '%22';
    for (const str of this.inputStringArr) {
      this.url = this.url + '%20OR%20' + '%22' + str + '%22';
    }
    this.url = this.url + ')%20AND%20verified%3Atrue)%5E3';
    for (const str of this.inputStringArr) {
      this.url = this.url + '%20OR%20' + '%22' + str + '%22';
    }
    this.url = this.url + '&rows=300';
    return this.httpService.get
    (this.url, { responseType: 'json' });
  }
}
