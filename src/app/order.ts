import { Customer } from "./customer";
import { Plant } from "./plant";
import { Planter } from "./planter";
import { Seed } from "./seed";

export interface Order{
    bookingOrderId: number;
    customer: Customer;
    orderDate: string;
	transactionMode:string;
	quantity: number;
	totalCost: number;
	planterQuantity: number;
	plantQuantity: number;
	seedQuantity: number;
	planters: Planter[];
	plant: Plant[];
    seed: Seed[];
}