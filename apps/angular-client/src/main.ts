import { TicketListComponent } from '@acme/ticket/feature/list';
import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(
        [
          { path: 'ticket/list', component: TicketListComponent },
          { path: '**', redirectTo: '/ticket/list' },
        ],
        {
          initialNavigation: 'enabledBlocking',
        }
      ),
    ])
  ]
}).catch((err) => console.error(err));
