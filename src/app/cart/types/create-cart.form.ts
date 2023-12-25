interface CartItem {
  productId: string;
  quantity: number;
}

export interface CreateCartForm {
  item: CartItem;
}
