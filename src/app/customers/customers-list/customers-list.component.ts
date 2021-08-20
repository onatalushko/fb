import { Component, OnInit } from '@angular/core';

import { CustomerService } from '../customer.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomersList();
  }

  getCustomersList() {
    // We use snapshotChanges() with RxJS map() operator to get the id of each item and assign to key field.
    this.customerService.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(customers => {
      this.customers = customers;
    });
  }

  deleteCustomers() {
    this.customerService.deleteAll();
  }

}
