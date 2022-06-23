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
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

const matModules = [
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatSelectModule,
  MatSnackBarModule,
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
  users: User[] = [];
  usersMap = new Map<number, string>();
  // TODO: move below constants
  status = new Map<boolean, string>([
    [false, 'Incomplete'],
    [true, 'Completed'],
  ]);
  displayedColumns: string[] = ['description', 'assignee', 'status'];
  clickedRows = new Set<Ticket>();

  constructor(
    private api: ApiService,
    private snackbar: MatSnackBar,
  ) { }

  addNewRow() {
    this.tickets.push({
      completed: false,
    } as Ticket);
    this.tickets = [...this.tickets];
  }

  search() { }

  cancel() {
    this.tickets = this.tickets.filter(ticket => ticket.id);
  }

  async saveTicket(description: string) {
    await lastValueFrom(this.api.newTicket({ description }));
    // TODO: move it to constants
    this.snackbar.open('Ticket Saved Successfully');
    this.tickets = await lastValueFrom(this.api.tickets());
  }

  async getTickets() {
    const [tickets, users] = await Promise.all([
      lastValueFrom(this.api.tickets()),
      lastValueFrom(this.api.users()),
    ]);
    this.tickets = tickets;
    this.users = users;
    users.forEach((user: User) => this.usersMap.set(user.id, user.name));
  }

  ngOnInit() {
    this.getTickets();
  }

}
