import { OrderDto } from './order.dto';
import { User } from './user.model';

export class OrderCreationDto {
    user: User;
    items: Array<OrderDto>;
}