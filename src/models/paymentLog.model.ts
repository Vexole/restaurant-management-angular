import { OrderLog } from './orderLog.model';

export class PaymentLog {
    id?: number;
    orderLog: OrderLog;
    status: string;
    total: number;
}