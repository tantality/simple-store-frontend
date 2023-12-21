import { BaseState } from "types/base-state.type";
import { OrderDto } from "./order.dto";

export interface OrdersState extends BaseState {
  orders: OrderDto[];
  isPending: {
    orders: boolean;
  };
  errors: {
    orders: string | null;
  };
}
