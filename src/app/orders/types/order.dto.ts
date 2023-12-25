import { UUIDDto } from "types/uuid-dto.type";
import { OrderItemDto } from "./order-item.dto";

enum OrderStatus {
  InCart = "in-cart",
  Placed = "placed",
}

export interface OrderDto extends UUIDDto {
  userId: string;
  totalPrice: number;
  items: OrderItemDto[];
  status: OrderStatus;
}
