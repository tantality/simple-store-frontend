import { Button } from "@mui/material";
import { useAppDispatch } from "hooks/redux.hooks";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { deleteCart, deleteCartItem } from "../store/cart.actions";
import { CartDtoIdentifier } from "../types/dto-identifiers.type";

interface DeleteCartItemButtonProps {
  cart: { id: CartDtoIdentifier, itemsLength: number }
  itemId: string;
}

const DeleteCartItemButton: FC<DeleteCartItemButtonProps> = ({ cart, itemId }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleButtonClick = async () => {
    const isOneItemInCart = cart.itemsLength === 1;

    if (isOneItemInCart) {
      const params = { cartId: cart.id };
      const response = await dispatch(deleteCart({ params }));

      if (response.meta.requestStatus === 'rejected') {
        enqueueSnackbar('Failed to delete the item.', { variant: 'error' });
      }
    }
    else {
      const params = { cartId: cart.id, itemId };
      const response = await dispatch(deleteCartItem({ params }));

      if (response.meta.requestStatus === 'rejected') {
        enqueueSnackbar('Failed to delete the item.', { variant: 'error' });
      }
    }
  }

  return (
    <Button onClick={handleButtonClick} variant="outlined" sx={{ borderColor: 'black', color: 'black' }}>
      Delete
    </Button>
  )
};

export default DeleteCartItemButton;
