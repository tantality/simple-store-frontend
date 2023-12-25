import { BaseState } from "types/base-state.type";
import { OrderDto } from "./order.dto";

export interface OrdersState extends BaseState {
  count: number | null;
  orders: OrderDto[];
  isPending: {
    count: boolean;
    orders: boolean;
  };
  errors: {
    count: string | null;
    orders: string | null;
  };
}
