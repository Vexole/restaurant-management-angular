import { Item } from './item.model';

export class ItemOrder {
    id: number;
    quanity: number;
    price: string;
    reason: string;
    item: Item;
}