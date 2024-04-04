import { ProductDto } from "app/products/types/product.dto";
import { UUIDDto } from "types/uuid-dto.type";

export interface CartItemDto extends UUIDDto {
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: ProductDto;
}
