import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  is_dark_mode_enabled: boolean = false;
  site_locale: string = 'fr';
  is_logged: boolean = true;
  currentApplicationVersion = environment.appVersion;

  title = 'overviewRRG';

  constructor(
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      'fr_flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/fr.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'gb_flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/gb.svg')
    );
  }
}
