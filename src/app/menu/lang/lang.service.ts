import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LangService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private destUrl = './assets/langMock/';

  private locales: any[];
  public values: any;

  constructor(private http: Http) {}

  getLocales(): Promise<any[]> {
    if (this.locales) {
      return Promise.resolve(this.locales);
    } else {
      return this.http.get(this.destUrl + 'locales.json').toPromise()
      .then(response => {
        this.locales = response.json() as any[];
        return this.locales;
      })
      .catch(this.handleError);
    }
  }

  getMap(locale: string): Promise<any> {
    if (locale === undefined) {
      return Promise.resolve(null);
    } else {
      return this.http.get(this.destUrl + locale + '_lang.json')
      .toPromise()
      .then(response => {
        this.values = response.json();
        return this.values;
      })
      .catch(this.handleError);
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
