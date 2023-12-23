import { PaginationQueryDto } from "types/pagination-query.dto";

export interface GetAllProductsQueryDto extends PaginationQueryDto {
  q: string;
}
