import {Component, OnInit} from '@angular/core';
import {SpotterService} from "./spotter.service";
import {LatestData} from "./latest-data";
import {WaveData} from "./wave-data";
import {Chart} from "./chart";
import {Series} from "./chart";
import {Wave} from "./wave-data";
import {NgxChartsModule} from "@swimlane/ngx-charts";

import {TESTDATA} from "./data";
import {MatTableDataSource} from "@angular/material";
import {s} from "@angular/core/src/render3";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Wave Buoy Data';

  latest: LatestData[];
  waveData: WaveData[];
  chart = new Array<Chart>();
  chartSWH = new Array<Chart>();
  //testChart = TESTDATA;


  view: any[] = [1200, 400];
  yes = true;
  no = false;
  xLabel = 'TimeStamp';
  yLabel = 'Measurements';
  theme = "dark";

  constructor(private service: SpotterService) {
  }



  ngOnInit() {
    this.getLatest();
    this.getWaveData();

  }

  getLatest(): void {
    this.service.getLatest().subscribe(latest => this.latest = latest);
  }

  getWaveData(): void {
    this.service.getWaveData().subscribe(waveData => this.waveData = waveData, error1 => console.log("Error: ", error1), () => this.processChart(this.waveData));
    //this.service.getWaveData().
  }

  processChart(waveData1):void {

    console.log("processing chart..." + waveData1.data.spotterId  + " : " + waveData1.data.waves.length);

    //swh
    this.chartSWH = new Array<Chart>();

    let c0:Chart = new Chart();
    c0.name = "Significant Wave Height";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < waveData1.data.waves.length; i++){
      let s:Series = new Series();
      var wave:Wave = waveData1.data.waves[i];
      s.name = wave.timestamp;
      s.value = wave.significantWaveHeight; //waveData1.data.waves[i].significantWaveHeight
      series.push(s);
    }
    c0.series = series;
    this.chartSWH.push(c0);




    //all
    this.chart = new Array<Chart>();


    let c1:Chart = new Chart();
    c1.name = "Significant Wave Height";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < waveData1.data.waves.length; i++){
      let s:Series = new Series();
      var wave:Wave = waveData1.data.waves[i];
      s.name = wave.timestamp;
      s.value = wave.significantWaveHeight; //waveData1.data.waves[i].significantWaveHeight
      series.push(s);
    }
    c1.series = series;
    this.chart.push(c1);

    let c2:Chart = new Chart();
    c2.name = "Peak Period";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < waveData1.data.waves.length; i++){
      let s:Series = new Series();
      var wave:Wave = waveData1.data.waves[i];
      s.name = wave.timestamp;
      s.value = wave.peakPeriod; //waveData1.data.waves[i].significantWaveHeight
      series.push(s);
    }
    c2.series = series;
    this.chart.push(c2);

    let c3:Chart = new Chart();
    c3.name = "Mean Period";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < waveData1.data.waves.length; i++){
      let s:Series = new Series();
      var wave:Wave = waveData1.data.waves[i];
      s.name = wave.timestamp;
      s.value = wave.meanPeriod;
      series.push(s);
    }
    c3.series = series;
    this.chart.push(c3);

    let c4:Chart = new Chart();
    c4.name = "Peak Directional Spread";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < waveData1.data.waves.length; i++){
      let s:Series = new Series();
      var wave:Wave = waveData1.data.waves[i];
      s.name = wave.timestamp;
      s.value = wave.peakDirectionalSpread
      series.push(s);
    }
    c4.series = series;
    this.chart.push(c4);


    let c5:Chart = new Chart();
    c5.name = "Mean Directional Spread";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < waveData1.data.waves.length; i++){
      let s:Series = new Series();
      var wave:Wave = waveData1.data.waves[i];
      s.name = wave.timestamp;
      s.value = wave.meanDirectionalSpread
      series.push(s);
    }
    c5.series = series;
    this.chart.push(c5);



    //console.log(this.chart)

  }


}
