import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, EMPTY, catchError, tap } from 'rxjs';

export interface EnvConfig {
  API_URL: string;
  ENV_NAME: string;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private cfgSync?: EnvConfig;

  private cfg$ = new ReplaySubject<EnvConfig>(1);

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<EnvConfig> {
    return this.http.get<EnvConfig>('/assets/env.json').pipe(
      tap((cfg) => {
        this.cfgSync = cfg;
        this.cfg$.next(cfg);
      }),
      catchError((err) => {
        console.error('Failed to load config:', err);
        return EMPTY;
      })
    );
  }

  get config$(): Observable<EnvConfig> {
    return this.cfg$.asObservable();
  }

  get<K extends keyof EnvConfig>(key: K): EnvConfig[K] | undefined {
    return this.cfgSync?.[key];
  }
}
