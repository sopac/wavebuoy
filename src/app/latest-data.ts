export class LatestData {
  data: Data;
}

interface Data {
  spotterId: string;
  spotterName: string;
  payloadType: string;
  batteryVoltage: number;
  batteryPower: number;
  solarVoltage: number;
  temperature: number;
  humidity: number;
  waves: Wave[];
  track: Track[];
  frequencyData: any[];
}

interface Track {
  timestamp: string;
  latitude: number;
  longitude: number;
}

interface Wave {
  significantWaveHeight: number;
  peakPeriod: number;
  meanPeriod: number;
  peakDirection: number;
  peakDirectionalSpread: number;
  meanDirection: number;
  meanDirectionalSpread: number;
  timestamp: string;
  latitude: number;
  longitude: number;
}
