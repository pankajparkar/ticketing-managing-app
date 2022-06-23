import { Component, OnInit } from '@angular/core';
import { ApiService } from '@acme/shared/data-access';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ticket, User } from '@acme/shared-models';
import { lastValueFrom } from 'rxjs';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const matModules = [
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
];

@Component({
  standalone: true,
  selector: 'acme-ticket-list',
  imports: [
    ...matModules,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class TicketListComponent implements OnInit {

  tickets: Ticket[] = [];
  users = new Map<number, string>();
  status = new Map<boolean, string>([
    [false, 'Incomplete'],
    [true, 'Completed'],
  ]);
  displayedColumns: string[] = ['description', 'assignee', 'status'];
  clickedRows = new Set<Ticket>();

  constructor(
    private api: ApiService,
  ) {
  }

  async getTickets() {
    const [tickets, users] = await Promise.all([
      lastValueFrom(this.api.tickets()),
      lastValueFrom(this.api.users()),
    ]);
    this.tickets = tickets;
    tickets.push({
      completed: false,
    } as Ticket);
    users.forEach((user: User) => this.users.set(user.id, user.name));
  }

  ngOnInit() {
    this.getTickets();
  }

}
