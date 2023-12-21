import { Button } from "@mui/material";
import { useAppDispatch } from "hooks/redux.hooks";
import { FC } from "react";
import { deleteCart, deleteCartItem } from "../store/cart.actions";

interface DeleteCartItemButtonProps {
  cart: { id: string, itemsLength: number }
  itemId: string;
}

const DeleteCartItemButton: FC<DeleteCartItemButtonProps> = ({ cart, itemId }) => {
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    const isOneItemInCart = cart.itemsLength === 1;
    if (isOneItemInCart) {
      const params = { cartId: cart.id };
      dispatch(deleteCart({ params }))
    }
    else {
      const params = { cartId: cart.id, itemId };
      dispatch(deleteCartItem({ params }))
    }
  }

  return (
    <Button
      onClick={handleButtonClick}
      variant="outlined"
      sx={{ borderColor: 'black', color: 'black' }}
    >
      Delete
    </Button>
  )
};

export default DeleteCartItemButton;
