import { CartDto } from "app/cart/types/cart.dto";
import { CartItemDto } from "./cart-item.dto";

export type CartDtoIdentifier = Pick<CartDto, "id">["id"];
export type CartItemDtoIdentifier = Pick<CartItemDto, "id">["id"];
