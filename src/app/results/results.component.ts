import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { DataService } from '../data.service';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})


export class ResultsComponent implements OnInit {

  constructor(private location: Location, private newData: DataService, private eventEmitterService: EventEmitterService ) { }
  data: object;
  loading: boolean;
  backClicked() {
    this.eventEmitterService.subsVar = undefined;
  }
  ngOnInit() {
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

}
