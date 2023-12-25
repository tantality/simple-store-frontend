import { BaseState } from "types/base-state.type";
import { ProductDto } from "./product.dto";

export interface ProductState extends BaseState {
  count: number | null;
  products: ProductDto[];
  isPending: {
    count: boolean;
    products: boolean;
  };
  errors: {
    count: string | null;
    products: string | null;
  };
}
