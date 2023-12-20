import { UUIDDto } from "types/uuid-dto.type";

interface ProductDto extends UUIDDto {
  name: string;
  quantity: number;
  price: number;
  img: string;
}

export interface CartItemDto extends UUIDDto {
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: ProductDto;
}
