import { PaginationQueryDto } from "types/pagination-query.dto";

export interface GetUserOrdersQueryDto extends PaginationQueryDto {
  excludeCart: boolean;
}
