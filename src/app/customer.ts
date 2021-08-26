import { Address } from "./address";
import { Order } from "./order";

export interface Customer{

    customerId: number,
    customerName: string;
    customerEmail: string;
    username: string;
    password: string;
    address: Address;
    orders: Order[]; 
}
