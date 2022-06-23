import { TicketDetailsComponent } from '@acme/ticket/feature/details';
import { TicketListComponent } from '@acme/ticket/feature/list';
import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
      BrowserAnimationsModule,
      RouterModule.forRoot(
        [
          { path: 'ticket/list', component: TicketListComponent },
          { path: 'ticket/details/:id', component: TicketDetailsComponent },
          { path: '**', redirectTo: '/ticket/list' },
        ],
        {
          initialNavigation: 'enabledBlocking',
        }
      ),
    ])
  ]
}).catch((err) => console.error(err));
