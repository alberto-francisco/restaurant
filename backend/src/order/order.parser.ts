import { OrderNote } from 'src/order_notes/order_note';
import { OrderNoteParser } from 'src/order_notes/order_note_parser';
import { AuditParser } from './../audit/audit.parser';
import { Order } from './order';
import { IOrderResponseDTO } from './order-response.dto';

export class OrderParser {
  static createOrderResponse(order: Order, notes?: OrderNote[]): IOrderResponseDTO {
    const { id, state, type, merchantId, customerId, total, discount, orderManagerId, audit } = order;
    return {
      id,
      state,
      type,
      merchantId,
      customerId,
      total,
      discount,
      orderManagerId,
      notes: OrderNoteParser.createOrderNotesResponse(notes),
      ...AuditParser.createAuditResponse(audit),
    };
  }

  static createOrdersResponse(orders: Order[]): IOrderResponseDTO[] {
    return orders.map((order) => this.createOrderResponse(order));
  }
}
