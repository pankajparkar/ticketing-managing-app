import { Component } from '@angular/core';
import { ApiService } from '@acme/shared/data-access';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'acme-ticket-details',
  imports: [
    CommonModule,
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class TicketDetailsComponent {

  ticket$ = this.route.params.pipe(
    () => this.api.ticket(this.route.snapshot.params['id'])
  );

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

}
