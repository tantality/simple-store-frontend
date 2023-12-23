import { OrderDto } from "./order.dto";

export interface OrdersDto {
  count: number;
  orders: OrderDto[];
}
