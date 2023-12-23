import { CartDto } from "app/cart/types/cart.dto";

export type CartDtoIdentifier = Pick<CartDto, "id">["id"];
