import MinusIconButton from "components/minus-icon-button.comp";
import { useAppDispatch } from "hooks/redux.hooks";
import { enqueueSnackbar } from "notistack";
import { FC, MouseEvent } from "react";
import { CartItemQuantity } from "../constants";
import { updateCartItem } from "../store/cart.actions";
import { CartItemDto } from "../types/cart-item.dto";
import { CartDtoIdentifier } from "../types/dto-identifiers.type";

interface ReduceCartItemQuantityButtonProps {
  isDisabled: boolean;
  cartId: CartDtoIdentifier;
  cartItem: CartItemDto;
}

const ReduceCartItemQuantityButton: FC<ReduceCartItemQuantityButtonProps> = ({ isDisabled, cartId, cartItem }) => {
  const dispatch = useAppDispatch();

  const handleReduceCartItemQuantity = async (e: MouseEvent<HTMLButtonElement>) => {
    const changedQuantity = cartItem.quantity - 1;

    if (changedQuantity >= CartItemQuantity.Min) {
      const params = { itemId: cartItem.id, cartId };
      const body = { quantity: changedQuantity };
      const response = await dispatch(updateCartItem({ params, body }));

      if (response.meta.requestStatus === 'rejected') {
        enqueueSnackbar('Failed to increase the quantity of the product.', { variant: 'error' });
      }
    }
  }

  return (
    <MinusIconButton
      disabled={isDisabled}
      onClick={handleReduceCartItemQuantity}
    />
  )
}

export default ReduceCartItemQuantityButton;