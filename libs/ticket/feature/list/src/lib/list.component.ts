import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@acme/shared/data-access';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ticket, User } from '@acme/shared-models';
import { lastValueFrom } from 'rxjs';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
    FormsModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class TicketListComponent implements OnInit {

  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  users: User[] = [];
  usersMap = new Map<number, string>();
  // TODO: move below constants
  status = new Map<boolean, string>([
    [false, 'Incomplete'],
    [true, 'Completed'],
  ]);
  displayedColumns: string[] = ['description', 'assignee', 'status'];
  clickedRows = new Set<Ticket>();
  pageSize = 10;
  total = 0;
  filters = {
    description: '',
    assigneeId: '',
  };

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private api: ApiService,
    private snackbar: MatSnackBar,
  ) {
  }

  addNewRow() {
    this.tickets.unshift({
      completed: false,
    } as Ticket);
    this.search();
  }

  search() {
    console.log(this.paginator.pageIndex);
    const { description, assigneeId } = this.filters;
    const currentPage = this.paginator.pageIndex * this.pageSize;
    const filteredTickets = this.tickets.filter(
      (ticket) => (
        !description || ticket.description.includes(description)
      ) && (
          !assigneeId || ticket.assigneeId === Number(assigneeId)
        )
    )
    this.total = filteredTickets.length;

    this.filteredTickets = filteredTickets.slice(currentPage, currentPage + this.pageSize);
  }

  cancel() {
    this.tickets = this.tickets.filter(ticket => ticket.id);
  }

  get isNewRecordAdded() {
    return this.tickets.some(ticket => !ticket.id);
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
    this.search();
    this.users = users;
    users.forEach((user: User) => this.usersMap.set(user.id, user.name));
  }

  ngOnInit() {
    this.getTickets();
  }

}
