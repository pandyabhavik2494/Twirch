import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { DataService } from '../data.service';
import { EventEmitterService } from '../event-emitter.service';
import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})


export class ResultsComponent implements OnInit {

  constructor(private location: Location, private newData: DataService, private eventEmitterService: EventEmitterService) { }
  data: any;
  showAnalysis: boolean;
  loading: boolean;
  backClicked() {
    this.eventEmitterService.subsVar = undefined;
  }

  anaClicked() {
    this.showAnalysis = true;
    this.showGraphs();
  }
  searchClicked() {
    this.showAnalysis = false;
  }
  ngOnInit() {
    this.showAnalysis = false;
    this.loading = true;
    if (this.eventEmitterService.subsVar === undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeFirstComponentFunction.subscribe((name: string) => {
        this.showData();
      });
    }
  }

  showData() {
    this.loading = false;
    this.data = this.newData.getState();
  }
  showGraphs() {

    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Country"
      },
      dataPointWidth: 25,
      data: [{
        type: "column",
        color: '#6f42c1',
        legendText:"India",
        showInLegend: false,
        dataPoints: [
          { y: this.data.source.value.facet_counts.facet_fields.country[1], label: this.data.source.value.facet_counts.facet_fields.country[0] },
          { y: this.data.source.value.facet_counts.facet_fields.country[3], label: this.data.source.value.facet_counts.facet_fields.country[2] },
          { y: this.data.source.value.facet_counts.facet_fields.country[5], label: this.data.source.value.facet_counts.facet_fields.country[4] }
        ]
      }
      ]
    });

    chart.render();


    const chart1 = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Hashtags"
      },
      dataPointWidth: 25,
      data: [{
        type: "column",
        color: '#DF7970',
        legendText:"India",
        showInLegend: false,
        dataPoints: [
          { y: this.data.source.value.facet_counts.facet_fields['entities.hashtags.text'][1], label: this.data.source.value.facet_counts.facet_fields['entities.hashtags.text'][0] },
          { y: this.data.source.value.facet_counts.facet_fields['entities.hashtags.text'][3], label: this.data.source.value.facet_counts.facet_fields['entities.hashtags.text'][2] },
          { y: this.data.source.value.facet_counts.facet_fields['entities.hashtags.text'][5], label: this.data.source.value.facet_counts.facet_fields['entities.hashtags.text'][4] }
        ]
      }
      ]
    });

    chart1.render();


    const chart2 = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Language"
      },
      dataPointWidth: 25,
      data: [{
        type: "column",
        color: '#51CDA0',
        legendText:"India",
        showInLegend: false,
        dataPoints: [
          { y: this.data.source.value.facet_counts.facet_fields.lang[1], label: this.data.source.value.facet_counts.facet_fields.lang[0] },
          { y: this.data.source.value.facet_counts.facet_fields.lang[3], label: this.data.source.value.facet_counts.facet_fields.lang[2] },
          { y: this.data.source.value.facet_counts.facet_fields.lang[5], label: this.data.source.value.facet_counts.facet_fields.lang[4] }
        ]
      }
      ]
    });

    chart2.render();




    const chart3 = new CanvasJS.Chart("chartContainer3", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Verified"
      },
      dataPointWidth: 25,
      data: [{
        type: "column",
        color: '#4C9CA0',
        legendText:"India",
        showInLegend: false,
        dataPoints: [
          {y: this.data.source.value.facet_counts.facet_fields.verified[1], label: this.data.source.value.facet_counts.facet_fields.verified[0] },
          {y: this.data.source.value.facet_counts.facet_fields.verified[3], label: this.data.source.value.facet_counts.facet_fields.verified[2] },
        ]
      }
      ]
    });

    chart3.render();

    const chart4 = new CanvasJS.Chart("chartContainer4", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Verified"
      },
      dataPointWidth: 25,
      data: [{
        type: "column",
        color: '#AE7D99',
        legendText:"India",
        showInLegend: false,
        dataPoints: [
          { y: this.data.source.value.facet_counts.facet_fields.tweet_sentiment[1], label: this.data.source.value.facet_counts.facet_fields.tweet_sentiment[0] },
          { y: this.data.source.value.facet_counts.facet_fields.tweet_sentiment[3], label: this.data.source.value.facet_counts.facet_fields.tweet_sentiment[2] },
          { y: this.data.source.value.facet_counts.facet_fields.tweet_sentiment[5], label: this.data.source.value.facet_counts.facet_fields.tweet_sentiment[4] }
        ]
      }
      ]
    });

    chart4.render();
  }
}
