import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http
      .get('/assets/env.json')
      .toPromise()
      .then((config) => (this.config = config));
  }

  get apiUrl(): string {
    return this.config?.API_URL;
  }

  get env(): string {
    return this.config?.ENV_NAME;
  }
}
