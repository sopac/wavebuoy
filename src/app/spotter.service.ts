import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {LatestData} from "./latest-data";
import {WaveData} from "./wave-data";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class SpotterService {

  private latestUrl = 'https://wavefleet.spoondriftspotter.co/api/latest-data?spotterId=SPOT-0089&token=b682251eb3ca95d6caf1eac39ae18c&includeDirectionalMoments=true';

  private waveDataUrl = 'https://wavefleet.spoondriftspotter.co/api/wave-data?spotterId=SPOT-0089&token=b682251eb3ca95d6caf1eac39ae18c&includeWaves=true&includeTrack=true&includeDirectionalMoments=true&limit=500';

  constructor(private http: HttpClient) {
  }



  getLatest (): Observable<LatestData[]> {
    return this.http.get<LatestData[]>(this.latestUrl)
      .pipe(
        tap(_ => this.log('fetched latest data...')),
        catchError(this.handleError('getLatest', []))
      );
  }


  getWaveData(): Observable<WaveData[]> {
    return this.http.get<WaveData[]>(this.waveDataUrl)
      .pipe(
        tap(_ => this.log('fetched wave data...')),
        catchError(this.handleError('getWave', []))
      );
  }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  private log(message: string) {
    console.log(message);
  }


}
