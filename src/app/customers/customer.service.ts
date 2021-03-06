import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private dbPath = '/customers';

  customersRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.customersRef = db.collection(this.dbPath);
  }

  createCustomer(customer: Customer): void {
    this.customersRef.add({...customer});
  }

  updateCustomer(key: string, value: any): Promise<any> {
    return this.customersRef.doc(key).update(value);
  }

  deleteCustomer(key: string): Promise<any> {
    return this.customersRef.doc(key).delete();
  }

  getCustomersList(): AngularFirestoreCollection {
    return this.customersRef;
  }

  deleteAll() {
    this.customersRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('Error: ', error);
      });
  }
}
