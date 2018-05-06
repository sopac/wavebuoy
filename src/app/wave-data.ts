export class WaveData {
  public data: Data;
}

export interface Data {
  spotterId: string;
  limit: number;
  waves: Wave[];
  track: Track[];
}

export interface Track {
  timestamp: string;
  latitude: number;
  longitude: number;
}

export interface Wave {
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
