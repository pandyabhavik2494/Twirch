import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})


export class ResultsComponent implements OnInit {

  constructor(private location: Location, private newData: DataService) { }
  data: object;
  backClicked() {
    this.location.back();
  }
  ngOnInit() {
  }

  showData() {
    this.data = this.newData.getState();
  }

}
