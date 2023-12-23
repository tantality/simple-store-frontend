import PlusIconButton from "components/plus-icon-buttom.comp";
import { useAppDispatch } from "hooks/redux.hooks";
import { enqueueSnackbar } from "notistack";
import { FC, MouseEvent } from "react";
import { CartItemQuantity } from "../constants";
import { updateCartItem } from "../store/cart.actions";
import { CartItemDto } from "../types/cart-item.dto";
import { CartDtoIdentifier } from "../types/dto-identifiers.type";

interface IncreaseCartItemQuantityButtonProps {
  isDisabled: boolean;
  cartId: CartDtoIdentifier;
  cartItem: CartItemDto;
}

const IncreaseCartItemQuantityButton: FC<IncreaseCartItemQuantityButtonProps> = ({ isDisabled, cartId, cartItem }) => {
  const dispatch = useAppDispatch();

  const handleIncreaseCartItemQuantity = async (e: MouseEvent<HTMLButtonElement>) => {
    const changedQuantity = cartItem.quantity + 1;

    if (changedQuantity <= CartItemQuantity.Max) {

      const params = { itemId: cartItem.id, cartId };
      const body = { quantity: changedQuantity };
      const response = await dispatch(updateCartItem({ params, body }));

      if (response.meta.requestStatus === 'rejected') {
        enqueueSnackbar('Failed to increase the quantity of the product.', { variant: 'error' });
      }
    }
  }

  return (
    <PlusIconButton
      disabled={isDisabled}
      onClick={handleIncreaseCartItemQuantity}
    />
  )
}

export default IncreaseCartItemQuantityButton;