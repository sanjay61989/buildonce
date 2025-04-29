import { Component } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'buildonce';
  constructor(private config: AppConfigService) {}

  ngOnInit() {
    this.config.loadConfig().then((d) => console.log(d));
    console.log(this.config.apiUrl);
  }
}
