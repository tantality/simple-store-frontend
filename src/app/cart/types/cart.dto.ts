import { UUIDDto } from "types/uuid-dto.type";
import { CartItemDto } from "./cart-item.dto";

export interface CartDto extends UUIDDto {
  userId: string;
  totalPrice: number;
  items: CartItemDto[];
}
