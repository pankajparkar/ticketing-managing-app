import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

const matModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
];

@Component({
  standalone: true,
  selector: 'acme-navbar',
  imports: [
    ...matModules,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

}
