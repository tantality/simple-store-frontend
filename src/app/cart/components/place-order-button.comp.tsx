import { Button } from "@mui/material";
import { useAppDispatch } from "hooks/redux.hooks";
import { useSnackbar } from "notistack";
import { Dispatch, FC, MouseEvent } from "react";
import { useNavigate } from "react-router";
import { placeOrder, getCart } from "../store/cart.actions";
import { CartDtoIdentifier } from "../types/dto-identifiers.type";

interface PlaceOrderButtonProps {
  isDisabled: boolean;
  setIsDisabled: Dispatch<React.SetStateAction<boolean>>;
  cartId: CartDtoIdentifier;
}

const PlaceOrderButton: FC<PlaceOrderButtonProps> = ({ isDisabled, setIsDisabled, cartId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsDisabled(true);
    const response = await dispatch(placeOrder({ params: { cartId } }));

    if (response.meta.requestStatus === 'rejected') {
      setIsDisabled(false);
      enqueueSnackbar('Failed to place the order.', { variant: 'error' });
    }
    else {
      enqueueSnackbar('The order is successfully placed.', { variant: 'success' });
      dispatch(getCart());
      navigate('/products/');
    }
  }

  return (
    <Button variant="contained" disabled={isDisabled} onClick={handleButtonClick}>Place an order</Button>
  )
};

export default PlaceOrderButton;