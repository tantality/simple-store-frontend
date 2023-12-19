import { BaseState } from "types/base-state.type";
import { ProductDto } from "./product.dto";

export interface ProductState extends BaseState {
  products: ProductDto[];
  isPending: {
    products: boolean;
  };
  errors: {
    products: string | null;
  };
}
