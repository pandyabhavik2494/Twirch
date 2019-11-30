import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { SearchTablePipe } from './search-table.pipe';
import { ConfigService } from './config/config.service';
import { SolrServiceService } from './solr-service.service';
import { DataService } from './data.service';
import { ResultsComponent } from './results/results.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {EventEmitterService} from './event-emitter.service';
import { NgxLoadingModule } from 'ngx-loading';
const appRoutes: Routes = [
  { path: 'results', component: ResultsComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxLoadingModule.forRoot({})
  ],
  providers: [ConfigService, SolrServiceService, DataService, EventEmitterService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
