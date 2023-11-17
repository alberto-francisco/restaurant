import { Result } from 'src/domain';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { IOrderResponseDTO } from '../order-response.dto';
import { Order } from '../order';

export interface IOrderService {
  createOrder(orderSummary: CreateOrderDTO): Promise<Result<IOrderResponseDTO>>;
  getOrders(): Promise<Result<Order[]>>;
}
