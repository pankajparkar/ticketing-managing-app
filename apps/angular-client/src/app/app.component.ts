import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@acme/shared/ui/navbar';
import { FooterComponent } from '@acme/shared/ui/footer';

@Component({
  standalone: true,
  selector: 'acme-root',
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent { }
