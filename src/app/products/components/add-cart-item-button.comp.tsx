import { Button } from "@mui/material";
import { createCart, createCartItem } from "app/cart/store/cart.actions";
import { cartSelector } from "app/cart/store/cart.selectors";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { FC } from "react";
import { ProductDto } from "../types/product.dto";

interface AddCartItemButtonProps {
  isProductInCart: boolean;
  setIsProductInCart: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductDto;
}

const AddCartItemButton: FC<AddCartItemButtonProps> = ({ isProductInCart, setIsProductInCart, product }) => {
  const { cart } = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();
  const btnText = isProductInCart ? 'In cart' : 'Add to card';

  const handleButtonClick = async () => {
    const isCartFilled = cart?.items?.length;

    if (isCartFilled) {
      const params = { cartId: cart?.id as string };
      const body = { productId: product.id, quantity: 1 };
      const response = await dispatch(createCartItem({ params, body }));
      if (response.meta.requestStatus !== 'rejected') {
        setIsProductInCart((prev) => !prev)
      }
    }
    else {
      const body = { item: { productId: product.id, quantity: 1 } };
      const response = await dispatch(createCart({ body }));
      if (response.meta.requestStatus !== 'rejected') {
        setIsProductInCart((prev) => !prev)
      }
    }
  }

  return (
    <Button fullWidth={true} variant="contained" disabled={isProductInCart} onClick={handleButtonClick}>{btnText}</Button>
  )
};

export default AddCartItemButton;