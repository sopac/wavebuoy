import {Component, OnInit} from '@angular/core';
import {SpotterService} from "./spotter.service";
import {LatestData} from "./latest-data";
import {WaveData} from "./wave-data";
import {Chart} from "./chart";
import {Series} from "./chart";
import {Wave} from "./wave-data";

import { icon, latLng, Layer, marker, tileLayer } from 'leaflet';


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
  chartMPP = new Array<Chart>();
  chartSWH = new Array<Chart>();
  chartDIR = new Array<Chart>();
  displayMax = "0";
  //testChart = TESTDATA;


  view: any[] = [1200, 400];
  yes = true;
  no = false;
  xLabel = 'TimeStamp';
  yLabel = 'Measurements';


  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'SPC' })
    ],
    zoom: 12,
    center: latLng(-18.17113, 177.42792)
  };

  markers: Layer[] = [];

  marker1 = marker([ -18.17113, 177.42792 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    })
  });




  constructor(private service: SpotterService) {
    this.markers.push(this.marker1);

  }



  ngOnInit() {
    this.getLatest();
    this.getWaveData();

  }

  chartRequest(max){
    console.log("Request for : " + max);
    this.processChart(this.waveData, max);
  }

  getLatest(): void {
    this.service.getLatest().subscribe(latest => this.latest = latest);
  }

  getWaveData(): void {
    this.service.getWaveData().subscribe(waveData => this.waveData = waveData, error1 => console.log("Error: ", error1), () => this.processChart(this.waveData, 50));
    //this.service.getWaveData().
  }

  processChart(waveData1, max):void {

    console.log("processing chart..." + waveData1.data.spotterId  + " : " + waveData1.data.waves.length);

    this.displayMax = max.toString();

    //var max = 100;
    var wavesArr = waveData1.data.waves.slice(waveData1.data.waves.length - max, waveData1.data.waves.length);
    if (max == -1){
     wavesArr = waveData1.data.waves;
     max = waveData1.data.waves.length;
     this.displayMax = max.toString();
    }

    //swh
    this.chartSWH = new Array<Chart>();

    let c0:Chart = new Chart();
    c0.name = "Significant Wave Height";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < wavesArr.length; i++){
      let s:Series = new Series();
      var wave:Wave = wavesArr[i];
      s.name = wave.timestamp;
      s.value = wave.significantWaveHeight; //waveData1.data.waves[i].significantWaveHeight
      series.push(s);
    }
    c0.series = series;
    this.chartSWH.push(c0);

    //mpp
    this.chartMPP = new Array<Chart>();
    /*
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
    */

    let c2:Chart = new Chart();
    c2.name = "Peak Period";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < wavesArr.length; i++){
      let s:Series = new Series();
      var wave:Wave = wavesArr[i];
      s.name = wave.timestamp;
      s.value = wave.peakPeriod; //waveData1.data.waves[i].significantWaveHeight
      series.push(s);
    }
    c2.series = series;
    this.chartMPP.push(c2);

    let c3:Chart = new Chart();
    c3.name = "Mean Period";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < wavesArr.length; i++){
      let s:Series = new Series();
      var wave:Wave = wavesArr[i];
      s.name = wave.timestamp;
      s.value = wave.meanPeriod;
      series.push(s);
    }
    c3.series = series;
    this.chartMPP.push(c3);

    /*
    let c4:Chart = new Chart();
    c4.name = "Peak Directional Spread";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < wavesArr.length; i++){
      let s:Series = new Series();
      var wave:Wave = wavesArr[i];
      s.name = wave.timestamp;
      s.value = wave.peakDirectionalSpread
      series.push(s);
    }
    c4.series = series;
    this.chart.push(c4);


    let c5:Chart = new Chart();
    c5.name = "Mean Directional Spread";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < wavesArr.length; i++){
      let s:Series = new Series();
      var wave:Wave = wavesArr[i];
      s.name = wave.timestamp;
      s.value = wave.meanDirectionalSpread
      series.push(s);
    }
    c5.series = series;
    this.chart.push(c5);
    */

    //dir
    this.chartDIR = new Array<Chart>();

    let c6:Chart = new Chart();
    c6.name = "Mean Direction";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < wavesArr.length; i++){
      let s:Series = new Series();
      var wave:Wave = wavesArr[i];
      s.name = wave.timestamp;
      s.value = wave.meanDirection;
      series.push(s);
    }
    c6.series = series;
    this.chartDIR.push(c6);

    let c7:Chart = new Chart();
    c7.name = "Peak Direction";
    var series:Series[] = new Array<Series>();
    for (var i = 0; i < wavesArr.length; i++){
      let s:Series = new Series();
      var wave:Wave = wavesArr[i];
      s.name = wave.timestamp;
      s.value = wave.peakDirection;
      series.push(s);
    }
    c7.series = series;
    this.chartDIR.push(c7);




    //console.log(this.chart)

  }


}
