import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {SpotterService} from "./spotter.service";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatListModule,
  MatTableModule
} from "@angular/material";




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    NgxChartsModule,
  ],
  providers: [SpotterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
