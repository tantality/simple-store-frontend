import { BaseState } from "types/base-state.type";
import { CartDto } from "./cart.dto";

export interface CartState extends BaseState {
  cart: CartDto | null;
  isPending: {
    cart: boolean;
  };
  errors: {
    cart: string | null;
  };
}
