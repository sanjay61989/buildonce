import { Component } from '@angular/core';
import { AppConfigService, EnvConfig } from './app-config.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  env$!: Observable<EnvConfig>;
  apiBase!: string;
  url: string | undefined;

  constructor(private cfg: AppConfigService) {}

  ngOnInit(): void {
    this.env$ = this.cfg.config$;

    this.cfg.config$.subscribe((env) => {
      this.apiBase = env.API_URL;
    });

    this.url = this.cfg.get('API_URL');
    // console.log(this.url);
  }
}
