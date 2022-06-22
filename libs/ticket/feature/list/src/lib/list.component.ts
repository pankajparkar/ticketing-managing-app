import { Component } from '@angular/core';
import { ApiService } from '@acme/shared/data-access';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'acme-ticket-list',
  imports: [
    CommonModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class TicketListComponent {

  tickets$ = this.api.tickets();
  users$ = this.api.users();

  constructor(
    private api: ApiService,
  ) { }

}
