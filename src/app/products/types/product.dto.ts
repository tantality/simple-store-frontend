import { UUIDDto } from "types/uuid-dto.type";

export interface ProductDto extends UUIDDto {
  name: string;
  quantity: number;
  price: number;
  img: string;
}
