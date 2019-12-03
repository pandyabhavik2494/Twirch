import {Component, Input} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'src/app/config/config.service';
import { Config } from 'src/app/config/config';
import { SolrServiceService } from 'src/app/solr-service.service';
import { DataService } from '../data.service';
import { EventEmitterService } from '../event-emitter.service';

import * as CanvasJS from 'src/assets/canvasjs.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'twirch';
  todoArray = [];

  config: Config;
  constructor(private http: HttpClient, private configService: ConfigService, private solrService: SolrServiceService, private newData: DataService, private eventEmitterService: EventEmitterService) {
  }
  url = '/solr/';
  dataSource: any;
  solrUrl: string;
  solrCore: string;
  alertMessage: string;
  inputString: string;
  inRes: any;
  usaRes: any
  braRes: any;
  showTable: boolean;
  loading: boolean;

  ngOnInit(): void {
    this.showTable = false;
    this.solrUrl = 'http://3.134.85.242:8983';
    this.solrCore = 'IRF19P4'
    this.alertMessage = '';
    this.loading = true;
    this.fillTableBr();
  }

  ParseData(data: string) {
    const parsedData = JSON.parse(data);
    this.dataSource = parsedData.response.docs;
  }

  ShowAlert(message: string) {
    this.alertMessage = message;
  }

  search() {
    this.GetQueryResponse();
  }


  GetQueryResponse() {
    this.alertMessage = '';
    this.solrService.getSearchResult(this.solrUrl,
      this.solrCore, this.inputString)
      .subscribe(data => {
        this.newData.changeState(data);
        this.firstComponentFunction();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.ShowAlert('Client-side error occured.');
          } else {
            this.ShowAlert('Server-side error occured.');
          }
        });
  }


  fillTableBr() {
    this.solrService.getAnaBrazil(this.solrUrl,
      this.solrCore)
      .subscribe(data => {
          this.braRes = data;
          this.fillTableIN();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.ShowAlert('Client-side error occured.');
          } else {
            this.ShowAlert('Server-side error occured.');
          }
        });
  }

  fillTableIN() {
    this.solrService.getAnaIndia(this.solrUrl,
      this.solrCore)
      .subscribe(data => {
          this.inRes = data;
          this.fillTableUSA();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.ShowAlert('Client-side error occured.');
          } else {
            this.ShowAlert('Server-side error occured.');
          }
        });
  }

  fillTableUSA() {
    this.solrService.getAnaUSA(this.solrUrl,
      this.solrCore)
      .subscribe(data => {
          this.usaRes = data;
          this.loading = false;
          this.showGraphs();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.ShowAlert('Client-side error occured.');
          } else {
            this.ShowAlert('Server-side error occured.');
          }
        });
  }
  firstComponentFunction() {
    this.eventEmitterService.onFirstComponentButtonClick();
  }

  showTables() {
    this.showTable = true;
  }

  showGraphs() {

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Most Active POIs"
      },
      dataPointWidth: 25,
      data: [{
        type: "column",
        color: '#DF7970',
        legendText:"India",
        showInLegend: true,
        dataPoints: [
          { x:40,y: this.inRes.facet_counts.facet_fields['user.screen_name'][1], label: this.inRes.facet_counts.facet_fields['user.screen_name'][0] },
          { x:60, y: this.inRes.facet_counts.facet_fields['user.screen_name'][3], label: this.inRes.facet_counts.facet_fields['user.screen_name'][2] },
          { x:80,y: this.inRes.facet_counts.facet_fields['user.screen_name'][5], label: this.inRes.facet_counts.facet_fields['user.screen_name'][4] }
        ]
      },
        {
        type: "column",
        color: "#6f42c1",
          legendText:"USA",
          showInLegend: true,
        dataPoints: [
          { x:100,y: this.usaRes.facet_counts.facet_fields['user.screen_name'][1], label: this.usaRes.facet_counts.facet_fields['user.screen_name'][0] },
          { x:120,y: this.usaRes.facet_counts.facet_fields['user.screen_name'][3], label: this.usaRes.facet_counts.facet_fields['user.screen_name'][2] },
          { x:140,y: this.usaRes.facet_counts.facet_fields['user.screen_name'][5], label: this.usaRes.facet_counts.facet_fields['user.screen_name'][4] }
        ]
      },
        {
          type: "column",
          color: "#51CDA0",
          legendText:"Brazil",
          showInLegend: true,
          dataPoints: [
            { x:160,y: this.braRes.facet_counts.facet_fields['user.screen_name'][1], label: this.braRes.facet_counts.facet_fields['user.screen_name'][0] },
            { x:180,y: this.braRes.facet_counts.facet_fields['user.screen_name'][3], label: this.braRes.facet_counts.facet_fields['user.screen_name'][2] },
            { x:200,y: this.braRes.facet_counts.facet_fields['user.screen_name'][5], label: this.braRes.facet_counts.facet_fields['user.screen_name'][4] }
          ]
        }
      ]
    });

    chart.render();



    let chart1 = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Most Influential POIs"
      },
      dataPointWidth: 25,
      data: [{
        type: "column",
        color: '#51CDA0',
        legendText:"India",
        showInLegend: true,
        dataPoints: [
          { x:40,y: this.inRes.facet_counts.facet_fields.in_reply_to_screen_name[1], label: this.inRes.facet_counts.facet_fields.in_reply_to_screen_name[0] },
          { x:60,y: this.inRes.facet_counts.facet_fields.in_reply_to_screen_name[3], label: this.inRes.facet_counts.facet_fields.in_reply_to_screen_name[2] },
          { x:80,y: this.inRes.facet_counts.facet_fields.in_reply_to_screen_name[5], label: this.inRes.facet_counts.facet_fields.in_reply_to_screen_name[4] }
        ]
      },
        {
          type: "column",
          color: "#DF874D",
          legendText:"USA",
          showInLegend: true,
          dataPoints: [
            { x:100,y: this.usaRes.facet_counts.facet_fields.in_reply_to_screen_name[1], label: this.usaRes.facet_counts.facet_fields.in_reply_to_screen_name[0] },
            { x:120,y: this.usaRes.facet_counts.facet_fields.in_reply_to_screen_name[3], label: this.usaRes.facet_counts.facet_fields.in_reply_to_screen_name[2] },
            { x:140,y: this.usaRes.facet_counts.facet_fields.in_reply_to_screen_name[5], label: this.usaRes.facet_counts.facet_fields.in_reply_to_screen_name[4] }
          ]
        },
        {
          type: "column",
          color: "#4C9CA0",
          legendText:"Brazil",
          showInLegend: true,
          dataPoints: [
            { x:160,y: this.braRes.facet_counts.facet_fields.in_reply_to_screen_name[1], label: this.braRes.facet_counts.facet_fields.in_reply_to_screen_name[0] },
            { x:180,y: this.braRes.facet_counts.facet_fields.in_reply_to_screen_name[3], label: this.braRes.facet_counts.facet_fields.in_reply_to_screen_name[2] },
            { x:200,y: this.braRes.facet_counts.facet_fields.in_reply_to_screen_name[5], label: this.braRes.facet_counts.facet_fields.in_reply_to_screen_name[4] }
          ]
        }
      ]
    });

    chart1.render();



    let chart2 = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Trending Topics"
      },
      dataPointWidth: 25,
      data: [{
        type: "column",
        color: '#C9D45C',
        legendText:"India",
        showInLegend: true,
        dataPoints: [
          { x:40,y: this.inRes.facet_counts.facet_fields['entities.hashtags.text'][1], label: this.inRes.facet_counts.facet_fields['entities.hashtags.text'][0] },
          { x:60,y: this.inRes.facet_counts.facet_fields['entities.hashtags.text'][3], label: this.inRes.facet_counts.facet_fields['entities.hashtags.text'][2] },
          { x:80,y: this.inRes.facet_counts.facet_fields['entities.hashtags.text'][5], label: this.inRes.facet_counts.facet_fields['entities.hashtags.text'][4] }
        ]
      },
        {
          type: "column",
          color: "#6f42c1",
          legendText:"USA",
          showInLegend: true,
          dataPoints: [
            { x:100,y: this.usaRes.facet_counts.facet_fields['entities.hashtags.text'][1], label: this.usaRes.facet_counts.facet_fields['entities.hashtags.text'][0] },
            { x:120,y: this.usaRes.facet_counts.facet_fields['entities.hashtags.text'][3], label: this.usaRes.facet_counts.facet_fields['entities.hashtags.text'][2] },
            { x:140,y: this.usaRes.facet_counts.facet_fields['entities.hashtags.text'][5], label: this.usaRes.facet_counts.facet_fields['entities.hashtags.text'][4] }
          ]
        },
        {
          type: "column",
          color: "#5592AD",
          legendText:"Brazil",
          showInLegend: true,
          dataPoints: [
            { x:160,y: this.braRes.facet_counts.facet_fields['entities.hashtags.text'][1], label: this.braRes.facet_counts.facet_fields['entities.hashtags.text'][0] },
            { x:180,y: this.braRes.facet_counts.facet_fields['entities.hashtags.text'][3], label: this.braRes.facet_counts.facet_fields['entities.hashtags.text'][2] },
            { x:200,y: this.braRes.facet_counts.facet_fields['entities.hashtags.text'][5], label: this.braRes.facet_counts.facet_fields['entities.hashtags.text'][4] }
          ]
        }
      ]
    });

    chart2.render();



    let chart3 = new CanvasJS.Chart("chartContainer3", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Sentiment Analysis"
      },
      dataPointWidth: 25,
      data: [{
        type: "column",
        color: '#DF7970',
        legendText:"India",
        showInLegend: true,
        dataPoints: [
          { x:40,y: this.inRes.facet_counts.facet_fields.tweet_sentiment[1], label: this.inRes.facet_counts.facet_fields.tweet_sentiment[0] },
          { x:60,y: this.inRes.facet_counts.facet_fields.tweet_sentiment[3], label: this.inRes.facet_counts.facet_fields.tweet_sentiment[2] },
          { x:80,y: this.inRes.facet_counts.facet_fields.tweet_sentiment[5], label: this.inRes.facet_counts.facet_fields.tweet_sentiment[4] }
        ]
      },
        {
          type: "column",
          color: "#AE7D99",
          legendText:"USA",
          showInLegend: true,
          dataPoints: [
            { x:100,y: this.usaRes.facet_counts.facet_fields.tweet_sentiment[1], label: this.usaRes.facet_counts.facet_fields.tweet_sentiment[0] },
            { x:120,y: this.usaRes.facet_counts.facet_fields.tweet_sentiment[3], label: this.usaRes.facet_counts.facet_fields.tweet_sentiment[2] },
            { x:140,y: this.usaRes.facet_counts.facet_fields.tweet_sentiment[5], label: this.usaRes.facet_counts.facet_fields.tweet_sentiment[4] }
          ]
        },
        {
          type: "column",
          color: "#6D78AD",
          legendText:"Brazil",
          showInLegend: true,
          dataPoints: [
            { x:160,y: this.braRes.facet_counts.facet_fields.tweet_sentiment[1], label: this.braRes.facet_counts.facet_fields.tweet_sentiment[0] },
            { x:180,y: this.braRes.facet_counts.facet_fields.tweet_sentiment[3], label: this.braRes.facet_counts.facet_fields.tweet_sentiment[2] },
            { x:200,y: this.braRes.facet_counts.facet_fields.tweet_sentiment[5], label: this.braRes.facet_counts.facet_fields.tweet_sentiment[4] }
          ]
        }
      ]
    });

    chart3.render();
  }
}
