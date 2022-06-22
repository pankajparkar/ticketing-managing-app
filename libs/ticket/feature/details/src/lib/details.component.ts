import { Component } from '@angular/core';
import { ApiService } from '@acme/shared/data-access';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'acme-ticket-list',
  imports: [
    CommonModule,
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class TicketDetailsComponent {

  tickets$ = this.api.tickets();
  users$ = this.api.users();

  constructor(
    private api: ApiService,
  ) { }

}
